import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** Grayscale placeholder mirroring the insights layout: header, tiles, charts. */
export const SellerAnalyticsSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.flex, {backgroundColor: theme.colors.background}]}>
            <View style={styles.header}>
                <Skeleton width={170} height={22} />
                <Skeleton width='100%' height={40} radius={12} style={styles.gapTop} />
            </View>

            <View style={styles.body}>
                <Skeleton width={140} height={16} />
                <View style={styles.row}>
                    <Skeleton height={84} radius={16} style={styles.tile} />
                    <Skeleton height={84} radius={16} style={styles.tile} />
                    <Skeleton height={84} radius={16} style={styles.tile} />
                </View>

                <Skeleton width={120} height={16} style={styles.gapTop} />
                <View style={styles.row}>
                    <Skeleton height={84} radius={16} style={styles.tile} />
                    <Skeleton height={84} radius={16} style={styles.tile} />
                    <Skeleton height={84} radius={16} style={styles.tile} />
                </View>

                <Skeleton width={150} height={16} style={styles.gapTop} />
                <Skeleton height={120} radius={16} />
                <Skeleton height={120} radius={16} style={styles.gapSm} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    header: {paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8, gap: 12},
    body: {padding: 20, gap: 12},
    row: {flexDirection: 'row', gap: 10},
    tile: {flex: 1},
    gapTop: {marginTop: 8},
    gapSm: {marginTop: 4},
})
