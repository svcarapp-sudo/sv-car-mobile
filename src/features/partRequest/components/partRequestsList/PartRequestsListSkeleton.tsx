import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** First-load placeholder mirroring the request dossier cards. */
export const PartRequestsListSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            {[0, 1, 2, 3].map(index => (
                <View key={index} style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                    <View style={styles.body}>
                        <Skeleton width={96} height={96} radius={14} />
                        <View style={styles.info}>
                            <View style={styles.chipsRow}>
                                <Skeleton width={56} height={18} radius={999} />
                                <Skeleton width={48} height={18} radius={999} />
                            </View>
                            <Skeleton width='90%' height={14} radius={7} />
                            <Skeleton width='62%' height={14} radius={7} />
                            <Skeleton width='48%' height={11} radius={6} style={styles.vehicleLine} />
                        </View>
                    </View>
                    <View style={[styles.footer, {borderTopColor: theme.colors.outlineVariant}]}>
                        <Skeleton width={110} height={13} radius={7} />
                        <Skeleton width={64} height={11} radius={6} />
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingTop: 4, paddingHorizontal: 12},
    card: {borderRadius: 18, marginBottom: 12},
    body: {flexDirection: 'row', gap: 12, padding: 12},
    info: {flex: 1, gap: 7},
    chipsRow: {flexDirection: 'row', gap: 6},
    vehicleLine: {marginTop: 'auto'},
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 12,
        paddingVertical: 11,
    },
})
