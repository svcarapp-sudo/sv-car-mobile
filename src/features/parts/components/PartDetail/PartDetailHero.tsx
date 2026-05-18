import {Image, StyleSheet, TouchableOpacity, View, I18nManager} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import type {Part, PartCategoryApi} from '@/global/types'

import {SaveButton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useSavedPartsStore} from '@/global/store'
import {shadows} from '@/global/theme'

interface PartDetailHeroProps {
    part: Part
    categoryInfo: PartCategoryApi | undefined
    onBack: () => void
    onShare?: () => void
}

/**
 * Edge-to-edge hero with floating circular nav buttons (Airbnb pattern).
 * Image fills the top portion; placeholder shows category icon on a soft amber wash.
 */
export const PartDetailHero = ({part, categoryInfo, onBack, onShare}: PartDetailHeroProps) => {
    const theme = useAppTheme()
    const saved = useSavedPartsStore(s => s.ids.includes(part.id))
    const toggle = useSavedPartsStore(s => s.toggle)
    const backIcon = I18nManager.isRTL ? 'arrow-left' : 'arrow-right'

    return (
        <View style={styles.wrapper}>
            <View style={[styles.imageBox, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode='cover' />
                ) : (
                    <View style={[styles.placeholder, {backgroundColor: theme.colors.accentSubtle}]}>
                        <View style={[styles.placeholderGlow, {backgroundColor: theme.colors.accentMuted}]} />
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={96} color={theme.colors.tertiary} />
                    </View>
                )}

                <View style={[styles.gradientTop, {backgroundColor: theme.colors.surface}]} />

                <View style={[styles.navRow, {top: 12}]}>
                    <TouchableOpacity
                        onPress={onBack}
                        style={[styles.circleBtn, shadows.sm, {backgroundColor: theme.colors.surface}]}
                        accessibilityRole='button'>
                        <Icon source={backIcon} size={22} color={theme.colors.onSurface} />
                    </TouchableOpacity>
                    <View style={styles.navEnd}>
                        {onShare && (
                            <TouchableOpacity
                                onPress={onShare}
                                style={[styles.circleBtn, shadows.sm, {backgroundColor: theme.colors.surface}]}
                                accessibilityRole='button'>
                                <Icon source='share-variant' size={20} color={theme.colors.onSurface} />
                            </TouchableOpacity>
                        )}
                        <SaveButton
                            saved={saved}
                            onPress={() => {
                                void toggle(part.id).catch(() => undefined)
                            }}
                            floating
                        />
                    </View>
                </View>

                {categoryInfo && (
                    <View
                        style={[
                            styles.categoryPill,
                            shadows.sm,
                            {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                        ]}>
                        <Icon source={categoryInfo.icon || 'tag'} size={13} color={theme.colors.tertiary} />
                        <Text style={[styles.categoryText, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {categoryInfo.name}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {position: 'relative'},
    imageBox: {
        width: '100%',
        height: 320,
        position: 'relative',
    },
    image: {width: '100%', height: '100%'},
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    placeholderGlow: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        opacity: 0.4,
    },
    gradientTop: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 24,
        opacity: 0,
    },
    navRow: {
        position: 'absolute',
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navEnd: {flexDirection: 'row', alignItems: 'center', gap: 10},
    circleBtn: {
        width: 42,
        height: 42,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryPill: {
        position: 'absolute',
        bottom: 16,
        start: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },
    categoryText: {fontSize: 11.5, fontWeight: '700', letterSpacing: 0.1},
})
