import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {formatPrice} from '@/global/utils'
import type {TopPart} from '../../types'

const formatNumber = (n: number) => new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(n)

interface LeaderboardRowProps {
    part: TopPart
    rank: number
}

/** A single most-viewed part row: rank badge, name + view count, amber price. */
export const LeaderboardRow = ({part, rank}: LeaderboardRowProps) => {
    const theme = useAppTheme()
    const top = rank === 1

    return (
        <View style={styles.row}>
            <View style={[styles.rank, {backgroundColor: top ? theme.colors.accentContainer : theme.colors.surfaceVariant}]}>
                <Text style={[styles.rankText, {color: top ? theme.colors.tertiary : theme.colors.onSurfaceVariant}]}>
                    {rank}
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {part.name}
                </Text>
                <Text style={[styles.views, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                    {`${formatNumber(part.viewCount)} مشاهدة`}
                </Text>
            </View>
            <Text style={[styles.price, {color: theme.colors.tertiary}]} numberOfLines={1}>
                {formatPrice(part.price)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9},
    rank: {width: 28, height: 28, borderRadius: 9, justifyContent: 'center', alignItems: 'center'},
    rankText: {fontSize: 13, fontWeight: '800'},
    body: {flex: 1, gap: 1},
    name: {fontSize: 13.5, fontWeight: '700'},
    views: {fontSize: 11.5, fontWeight: '500'},
    price: {fontSize: 13.5, fontWeight: '800', letterSpacing: -0.2},
})
