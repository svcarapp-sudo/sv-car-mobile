import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

export type TileAccent = 'primary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info'

const formatNumber = (n: number) => new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(n)

interface AnalyticsTileProps {
    value: number
    caption: string
    accent: TileAccent
    icon?: string
}

/**
 * Compact KPI tile (big number + caption, optional icon) used by the
 * stock-health and offers-funnel rows. Self-contained — does not depend on the
 * overview's SellerStatTile, so the two can evolve independently.
 */
export const AnalyticsTile = ({value, caption, accent, icon}: AnalyticsTileProps) => {
    const theme = useAppTheme()
    const accentMap: Record<TileAccent, {bg: string; fg: string}> = {
        primary: {bg: theme.colors.primaryContainer, fg: theme.colors.primary},
        tertiary: {bg: theme.colors.accentContainer, fg: theme.colors.tertiary},
        success: {bg: theme.colors.successContainer, fg: theme.colors.success},
        warning: {bg: theme.colors.warningContainer, fg: theme.colors.warning},
        error: {bg: theme.colors.errorContainer, fg: theme.colors.error},
        info: {bg: theme.colors.infoContainer, fg: theme.colors.info},
    }
    const c = accentMap[accent]

    return (
        <View style={[styles.tile, {backgroundColor: c.bg}]}>
            {!!icon && (
                <View style={[styles.iconRing, {backgroundColor: theme.colors.surface}]}>
                    <Icon source={icon} size={15} color={c.fg} />
                </View>
            )}
            <Text style={[styles.value, {color: c.fg}]} numberOfLines={1}>
                {formatNumber(value)}
            </Text>
            <Text style={[styles.caption, {color: c.fg}]} numberOfLines={2}>
                {caption}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 6,
        borderRadius: 16,
        gap: 3,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    iconRing: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 2},
    value: {fontSize: 19, fontWeight: '800', letterSpacing: -0.4},
    caption: {fontSize: 10.5, fontWeight: '700', opacity: 0.9, textAlign: 'center'},
})
