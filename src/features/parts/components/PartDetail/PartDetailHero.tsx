import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import type {Part, PartCategoryApi} from '@/global/types'

import {FadeInImage} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import {PartDetailHeroNav} from './PartDetailHeroNav'

interface PartDetailHeroProps {
    part: Part
    categoryInfo: PartCategoryApi | undefined
    onBack: () => void
    onShare?: () => void
}

/**
 * Edge-to-edge hero with floating circular nav buttons (Airbnb pattern).
 * Image fades in progressively; placeholder shows category icon on a soft amber wash.
 */
export const PartDetailHero = ({part, categoryInfo, onBack, onShare}: PartDetailHeroProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrapper}>
            <View style={[styles.imageBox, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                {part.imageUrl ? (
                    <FadeInImage
                        source={{uri: part.imageUrl}}
                        style={styles.image}
                        resizeMode='cover'
                        fallbackIcon={categoryInfo?.icon || 'package-variant'}
                        fallbackIconSize={96}
                    />
                ) : (
                    <View style={[styles.placeholder, {backgroundColor: theme.colors.accentSubtle}]}>
                        <View style={[styles.placeholderGlow, {backgroundColor: theme.colors.accentMuted}]} />
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={96} color={theme.colors.tertiary} />
                    </View>
                )}

                <PartDetailHeroNav partId={part.id} onBack={onBack} onShare={onShare} />

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
