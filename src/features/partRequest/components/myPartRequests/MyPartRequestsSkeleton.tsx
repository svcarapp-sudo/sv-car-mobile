import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** First-load placeholder mirroring the own-request status cards. */
export const MyPartRequestsSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <View style={[styles.bar, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                {[0, 1, 2, 3].map(i => (
                    <View key={i} style={styles.barTile}>
                        <Skeleton width={22} height={18} radius={6} />
                        <Skeleton width={34} height={10} radius={5} />
                    </View>
                ))}
            </View>
            {[0, 1, 2].map(i => (
                <View key={i} style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                    <View style={styles.top}>
                        <Skeleton width={72} height={22} radius={999} />
                        <Skeleton width={20} height={20} radius={999} />
                    </View>
                    <View style={styles.body}>
                        <Skeleton width={84} height={84} radius={14} />
                        <View style={styles.info}>
                            <Skeleton width={72} height={16} radius={999} />
                            <Skeleton width='90%' height={14} radius={7} />
                            <Skeleton width='55%' height={11} radius={6} style={styles.vehicleLine} />
                        </View>
                    </View>
                    <View style={[styles.footer, {borderTopColor: theme.colors.outlineVariant}]}>
                        <Skeleton width={110} height={13} radius={7} />
                        <Skeleton width={60} height={11} radius={6} />
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingTop: 4, paddingHorizontal: 12},
    bar: {flexDirection: 'row', gap: 4, padding: 5, borderRadius: 16, borderWidth: 1, marginBottom: 12},
    barTile: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12},
    card: {borderRadius: 18, marginBottom: 12},
    top: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 12},
    body: {flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12},
    info: {flex: 1, gap: 8},
    vehicleLine: {marginTop: 4},
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 12,
        paddingVertical: 11,
    },
})
