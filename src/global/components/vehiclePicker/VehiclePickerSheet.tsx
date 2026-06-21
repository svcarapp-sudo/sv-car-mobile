import {useEffect, useMemo, useRef, useState} from 'react'
import {Animated, Modal, PanResponder, Pressable, ScrollView, StyleSheet, View} from 'react-native'

import {shadows, themeColors} from '@/global/theme'
import type {Vehicle} from '@/global/types'
import {haptics} from '@/global/utils'

import {MOTION} from '../motion'
import {VehiclePickerHeader} from './VehiclePickerHeader'
import {VehiclePickerRow} from './VehiclePickerRow'
import {VehiclePickerAddRow} from './VehiclePickerAddRow'

const DEFAULTS = {
    TITLE: 'مركباتي',
    SUBTITLE_MANAGE: 'بدّل، عدّل، أو أضف مركبة',
    SUBTITLE_SELECT: 'بدّل المركبة الحالية',
    CLOSE: 'إغلاق',
}
const OFFSCREEN = 640
const DRAG_DISMISS = 110

export interface VehiclePickerSheetProps {
    visible: boolean
    onClose: () => void
    vehicles: Vehicle[]
    activeVehicleId: string | null
    onSelect: (id: string) => void
    title?: string
    subtitle?: string
    maxVehicles?: number
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
    onAdd?: () => void
}

/**
 * Reusable vehicle picker bottom sheet. Pass onEdit/onDelete/onAdd for a full
 * "manage" sheet, or omit them for a lightweight pick-a-vehicle selector.
 */
export const VehiclePickerSheet = ({
    visible,
    onClose,
    vehicles,
    activeVehicleId,
    onSelect,
    title,
    subtitle,
    maxVehicles,
    onEdit,
    onDelete,
    onAdd,
}: VehiclePickerSheetProps) => {
    const progress = useRef(new Animated.Value(0)).current
    const dragY = useRef(new Animated.Value(0)).current
    const [rendered, setRendered] = useState(visible)

    useEffect(() => {
        if (visible) {
            setRendered(true)
            dragY.setValue(0)
            haptics.light()
            Animated.timing(progress, {toValue: 1, duration: 300, easing: MOTION.easing.enter, useNativeDriver: true}).start()
        } else {
            Animated.timing(progress, {toValue: 0, duration: 220, easing: MOTION.easing.exit, useNativeDriver: true}).start(
                ({finished}) => finished && setRendered(false)
            )
        }
    }, [visible, progress, dragY])

    // Drag-to-dismiss lives on the handle/header only, so it never fights list scroll.
    const pan = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, g) => g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx),
                onPanResponderMove: (_, g) => g.dy > 0 && dragY.setValue(g.dy),
                onPanResponderRelease: (_, g) => {
                    if (g.dy > DRAG_DISMISS || g.vy > 0.6) onClose()
                    else Animated.spring(dragY, {toValue: 0, useNativeDriver: true, bounciness: 2, speed: 18}).start()
                },
            }),
        [dragY, onClose]
    )

    if (!rendered) return null

    const translateY = Animated.add(progress.interpolate({inputRange: [0, 1], outputRange: [OFFSCREEN, 0]}), dragY)
    const backdropOpacity = progress.interpolate({inputRange: [0, 1], outputRange: [0, 0.5]})
    const capReached = maxVehicles != null && vehicles.length >= maxVehicles
    const manageMode = !!onEdit || !!onDelete
    const sheetSubtitle = subtitle ?? (manageMode ? DEFAULTS.SUBTITLE_MANAGE : DEFAULTS.SUBTITLE_SELECT)

    return (
        <Modal visible transparent animationType='none' onRequestClose={onClose} statusBarTranslucent>
            <View style={styles.container}>
                <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel={DEFAULTS.CLOSE} />
                </Animated.View>

                <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
                    <View {...pan.panHandlers}>
                        <VehiclePickerHeader
                            title={title ?? DEFAULTS.TITLE}
                            subtitle={sheetSubtitle}
                            count={vehicles.length}
                            max={maxVehicles}
                            onClose={onClose}
                        />
                    </View>

                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}>
                        {vehicles.map(v => (
                            <VehiclePickerRow
                                key={v.id}
                                vehicle={v}
                                active={v.id === activeVehicleId}
                                onSelect={() => onSelect(v.id)}
                                onEdit={onEdit ? () => onEdit(v.id) : undefined}
                                onDelete={onDelete && v.id !== activeVehicleId ? () => onDelete(v.id) : undefined}
                            />
                        ))}
                        {onAdd && <VehiclePickerAddRow capReached={capReached} onPress={onAdd} />}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'flex-end'},
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: themeColors.surfaceDark},
    sheet: {
        backgroundColor: themeColors.surface,
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        paddingBottom: 28,
        maxHeight: '85%',
        ...shadows.lg,
    },
    list: {flexShrink: 1},
    listContent: {paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8},
})
