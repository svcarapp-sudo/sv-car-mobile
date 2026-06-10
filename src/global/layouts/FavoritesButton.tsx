import {StyleSheet, View} from 'react-native'
import {Text, IconButton} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

interface FavoritesButtonProps {
    count: number
    onPress: () => void
}

/**
 * Header favorites action: a neutral outline heart with a compact, brand-navy
 * count badge. The surface-coloured ring lifts the badge cleanly off the icon.
 */
export const FavoritesButton = ({count, onPress}: FavoritesButtonProps) => {
    const theme = useAppTheme()
    const hasSaved = count > 0
    const label = count > 99 ? '99+' : String(count)

    return (
        <View style={styles.wrap}>
            <IconButton
                icon='heart-outline'
                size={24}
                iconColor={theme.colors.onSurfaceVariant}
                onPress={onPress}
                style={styles.iconBtn}
                accessibilityLabel={hasSaved ? `Favorites, ${count} saved` : 'Favorites'}
            />
            {hasSaved && (
                <View
                    style={[styles.badge, {backgroundColor: theme.colors.primary, borderColor: theme.colors.surface}]}
                    pointerEvents='none'>
                    <Text style={[styles.badgeText, {color: theme.colors.onPrimary}]} numberOfLines={1}>
                        {label}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: 'relative',
    },
    iconBtn: {
        margin: 0,
    },
    badge: {
        position: 'absolute',
        top: 2,
        end: 0,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 3.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '800',
        lineHeight: 13,
        textAlign: 'center',
        includeFontPadding: false,
    },
})
