import React, {useEffect, useRef} from 'react'
import {Animated, Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'
import {MAX_VEHICLES} from '@/global/store'
import type {Vehicle} from '@/global/types'
import {VehicleSwitcherAddRow} from './VehicleSwitcherAddRow'
import {VehicleSwitcherRow} from './VehicleSwitcherRow'

const ARABIC_TEXT = {
    TITLE: 'مركباتي',
    SUBTITLE: 'بدّل، عدّل، أو أضف مركبة',
}

interface VehicleSwitcherSheetProps {
    visible: boolean
    onClose: () => void
    vehicles: Vehicle[]
    activeVehicleId: string | null
    onSelect: (id: string) => void
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onAdd: () => void
}

export const VehicleSwitcherSheet = ({
    visible,
    onClose,
    vehicles,
    activeVehicleId,
    onSelect,
    onEdit,
    onDelete,
    onAdd,
}: VehicleSwitcherSheetProps) => {
    const slide = useRef(new Animated.Value(0)).current
    const backdrop = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slide, {toValue: visible ? 1 : 0, duration: 280, useNativeDriver: true}),
            Animated.timing(backdrop, {toValue: visible ? 1 : 0, duration: 240, useNativeDriver: true}),
        ]).start()
    }, [visible, slide, backdrop])

    const translateY = slide.interpolate({inputRange: [0, 1], outputRange: [520, 0]})
    const opacity = backdrop.interpolate({inputRange: [0, 1], outputRange: [0, 0.5]})
    const capReached = vehicles.length >= MAX_VEHICLES

    return (
        <Modal visible={visible} transparent animationType='none' onRequestClose={onClose} statusBarTranslucent>
            <View style={styles.container}>
                <Animated.View style={[styles.backdrop, {opacity}]}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel='close switcher' />
                </Animated.View>

                <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>{ARABIC_TEXT.TITLE}</Text>
                            <Text style={styles.subtitle}>{ARABIC_TEXT.SUBTITLE}</Text>
                        </View>
                        <View style={styles.counterChip}>
                            <Text style={styles.counterText}>
                                {vehicles.length}/{MAX_VEHICLES}
                            </Text>
                        </View>
                        <Pressable
                            onPress={onClose}
                            hitSlop={8}
                            style={({pressed}) => [styles.closeBtn, pressed && {opacity: 0.6}]}
                            accessibilityLabel='close'>
                            <Icon source='close' size={20} color={themeColors.onSurfaceVariant} />
                        </Pressable>
                    </View>

                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}>
                        {vehicles.map(v => {
                            const isActive = v.id === activeVehicleId
                            return (
                                <VehicleSwitcherRow
                                    key={v.id}
                                    vehicle={v}
                                    active={isActive}
                                    onSelect={() => onSelect(v.id)}
                                    onEdit={() => onEdit(v.id)}
                                    onDelete={!isActive ? () => onDelete(v.id) : undefined}
                                />
                            )
                        })}
                        <VehicleSwitcherAddRow capReached={capReached} onPress={onAdd} />
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'flex-end'},
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: '#0F172A'},
    sheet: {
        backgroundColor: themeColors.surface,
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        paddingTop: 8,
        paddingBottom: 28,
        maxHeight: '85%',
        ...shadows.lg,
    },
    handle: {alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: themeColors.outline, marginBottom: 14},
    header: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16, gap: 10},
    titleBlock: {flex: 1},
    title: {fontSize: 19, fontWeight: '700', color: themeColors.onSurface, letterSpacing: -0.3},
    subtitle: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 2},
    counterChip: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: themeColors.accentSubtle},
    counterText: {fontSize: 12, fontWeight: '700', color: themeColors.tertiary, letterSpacing: 0.3},
    closeBtn: {
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: themeColors.surfaceContainerLow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {flexGrow: 0},
    listContent: {paddingHorizontal: 18, paddingBottom: 8},
})
