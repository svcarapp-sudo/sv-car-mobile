import {useEffect, useRef, useState} from 'react'
import {Animated, Modal, Pressable, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {MOTION} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import {haptics} from '@/global/utils'

import {SortOptionRow} from './SortOptionRow'

const ARABIC_TEXT = {
    TITLE: 'ترتيب النتائج',
    CLOSE: 'إغلاق',
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name'

export const SORT_LABELS: Record<SortOption, string> = {
    newest: 'الأحدث',
    price_asc: 'السعر: من الأقل',
    price_desc: 'السعر: من الأعلى',
    name: 'الاسم',
}

const OPTIONS: {value: SortOption; icon: string}[] = [
    {value: 'newest', icon: 'clock-fast'},
    {value: 'price_asc', icon: 'sort-numeric-ascending'},
    {value: 'price_desc', icon: 'sort-numeric-descending'},
    {value: 'name', icon: 'sort-alphabetical-ascending'},
]

interface PartsListSortSheetProps {
    visible: boolean
    selected: SortOption
    onSelect: (value: SortOption) => void
    onDismiss: () => void
}

/**
 * Bottom sheet with real enter/exit motion: backdrop fade + sheet slide
 * (decelerated in, accelerated out) — mirrors VehicleSwitcherSheet.
 */
export const PartsListSortSheet = ({visible, selected, onSelect, onDismiss}: PartsListSortSheetProps) => {
    const theme = useAppTheme()
    const progress = useRef(new Animated.Value(0)).current
    const [rendered, setRendered] = useState(visible)

    useEffect(() => {
        if (visible) {
            setRendered(true)
            Animated.timing(progress, {
                toValue: 1,
                duration: 280,
                easing: MOTION.easing.enter,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(progress, {
                toValue: 0,
                duration: 220,
                easing: MOTION.easing.exit,
                useNativeDriver: true,
            }).start(({finished}) => finished && setRendered(false))
        }
    }, [visible, progress])

    if (!rendered) return null

    const translateY = progress.interpolate({inputRange: [0, 1], outputRange: [360, 0]})
    const backdropOpacity = progress.interpolate({inputRange: [0, 1], outputRange: [0, 0.5]})

    const handleSelect = (value: SortOption) => {
        haptics.selection()
        onSelect(value)
        onDismiss()
    }

    return (
        <Modal visible transparent animationType='none' onRequestClose={onDismiss} statusBarTranslucent>
            <View style={styles.container}>
                <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} accessibilityLabel={ARABIC_TEXT.CLOSE} />
                </Animated.View>

                <Animated.View style={[styles.sheet, {backgroundColor: theme.colors.surface, transform: [{translateY}]}]}>
                    <View style={[styles.handle, {backgroundColor: theme.colors.outlineVariant}]} />
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>

                    <View style={styles.options}>
                        {OPTIONS.map(opt => (
                            <SortOptionRow
                                key={opt.value}
                                icon={opt.icon}
                                label={SORT_LABELS[opt.value]}
                                active={opt.value === selected}
                                onPress={() => handleSelect(opt.value)}
                            />
                        ))}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'flex-end'},
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: themeColors.surfaceDark},
    sheet: {
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        paddingTop: 10,
        paddingBottom: 28,
        paddingHorizontal: 20,
        gap: 16,
        ...shadows.lg,
    },
    handle: {width: 40, height: 4, borderRadius: 2, alignSelf: 'center'},
    title: {fontSize: 16, fontWeight: '800', textAlign: 'center', letterSpacing: -0.2},
    options: {gap: 8},
})
