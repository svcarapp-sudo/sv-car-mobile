import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {FadeSlideIn, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import {toAsciiDigits} from '@/global/utils'

import type {MyPartRequestCounts} from '../../hooks/useMyPartRequests'
import type {PartRequestStatus} from '../../types'

const TILES: {value: PartRequestStatus | null; label: string; key: keyof MyPartRequestCounts}[] = [
    {value: null, label: 'الكل', key: 'all'},
    {value: 'OPEN', label: 'مفتوح', key: 'OPEN'},
    {value: 'FULFILLED', label: 'تم التوفير', key: 'FULFILLED'},
    {value: 'CLOSED', label: 'مغلق', key: 'CLOSED'},
]

interface MyPartRequestsFiltersProps {
    status: PartRequestStatus | null
    counts: MyPartRequestCounts
    onChange: (next: PartRequestStatus | null) => void
}

/**
 * Dashboard stat bar that doubles as the status filter: each tile shows a live
 * count and selects that status when tapped.
 */
export const MyPartRequestsFilters = ({status, counts, onChange}: MyPartRequestsFiltersProps) => {
    const theme = useAppTheme()

    return (
        <FadeSlideIn delay={70} style={styles.wrap}>
            <View style={[styles.bar, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                {TILES.map(tile => {
                    const active = status === tile.value
                    return (
                        <PressableScale
                            key={tile.label}
                            onPress={() => onChange(tile.value)}
                            withHaptic
                            scaleTo={0.95}
                            accessibilityRole='button'
                            accessibilityState={{selected: active}}
                            containerStyle={styles.tileWrap}
                            style={[styles.tile, active && {backgroundColor: theme.colors.primary}]}>
                            <Text style={[styles.count, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]}>
                                {toAsciiDigits(String(counts[tile.key]))}
                            </Text>
                            <Text
                                style={[styles.label, {color: active ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}]}
                                numberOfLines={1}>
                                {tile.label}
                            </Text>
                        </PressableScale>
                    )
                })}
            </View>
        </FadeSlideIn>
    )
}

const styles = StyleSheet.create({
    wrap: {paddingHorizontal: 12, marginTop: 10, marginBottom: 12},
    bar: {flexDirection: 'row', gap: 4, padding: 5, borderRadius: 16, borderWidth: 1, ...shadows.md},
    tileWrap: {flex: 1},
    tile: {alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 12, gap: 3},
    count: {fontSize: 17, fontWeight: '800', letterSpacing: -0.3},
    label: {fontSize: 10.5, fontWeight: '700', letterSpacing: 0.1},
})
