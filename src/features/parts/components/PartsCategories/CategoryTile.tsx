import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

interface CategoryTileProps {
    name: string
    icon?: string | null
    onPress: () => void
}

/**
 * Premium mono-icon tile inside the Categories grid.
 * Accent bar at the bottom carries the amber identity without flooding the tile.
 */
export const CategoryTile = ({name, icon, onPress}: CategoryTileProps) => {
    const theme = useAppTheme()

    return (
        <PressableScale
            onPress={onPress}
            withHaptic
            containerStyle={styles.wrapper}
            style={[styles.tile, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}
            accessibilityRole='button'
            accessibilityLabel={name}>
            <View style={[styles.iconBox, {backgroundColor: theme.colors.accentSubtle}]}>
                <Icon source={icon || 'package-variant'} size={26} color={theme.colors.primary} />
            </View>
            <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>
                {name}
            </Text>
            <View style={[styles.accentBar, {backgroundColor: theme.colors.tertiary}]} />
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 5,
    },
    tile: {
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 14,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        minHeight: 112,
        overflow: 'hidden',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 11.5,
        fontWeight: '600',
        lineHeight: 16,
        textAlign: 'center',
        paddingHorizontal: 2,
    },
    accentBar: {
        position: 'absolute',
        bottom: 0,
        start: '50%',
        marginStart: -10,
        width: 20,
        height: 2,
        borderRadius: 1,
        opacity: 0.5,
    },
})
