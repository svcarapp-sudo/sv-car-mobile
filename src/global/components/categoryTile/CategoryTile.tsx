import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

import {CategoryArt} from '../categoryArt'
import {PressableScale} from '../motion'

interface CategoryTileProps {
    category: PartCategoryApi
    onPress: () => void
    selected?: boolean
}

/**
 * Shared category tile: a dimensional CategoryArt illustration + Arabic label on
 * a lifted surface card. Used on Home (browse) and the part-request stepper
 * (selectable) so categories look identical everywhere. Pass `selected` to draw
 * the primary ring + check badge.
 */
export const CategoryTile = ({category, onPress, selected = false}: CategoryTileProps) => {
    const theme = useAppTheme()

    return (
        <PressableScale
            onPress={onPress}
            withHaptic
            containerStyle={styles.wrapper}
            style={[
                styles.tile,
                {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                selected && {borderColor: theme.colors.primary},
            ]}
            accessibilityRole='button'
            accessibilityState={{selected}}
            accessibilityLabel={category.name}>
            <View style={styles.art}>
                <CategoryArt slug={category.slug} size={64} />
            </View>
            <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2} ellipsizeMode='tail'>
                {category.name}
            </Text>
            {selected ? (
                <View style={[styles.check, {backgroundColor: theme.colors.primary}]}>
                    <Icon source='check' size={12} color={theme.colors.onPrimary} />
                </View>
            ) : null}
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    wrapper: {width: '33.3333%', padding: 5},
    tile: {
        borderRadius: 18,
        paddingTop: 14,
        paddingBottom: 13,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1.5,
        minHeight: 128,
        ...shadows.sm,
    },
    art: {marginBottom: 4},
    name: {fontSize: 11.5, fontWeight: '600', lineHeight: 16, textAlign: 'center', paddingHorizontal: 2},
    check: {
        position: 'absolute',
        top: 8,
        end: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
