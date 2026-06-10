import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** First-load placeholder mirroring the stats strip and part cards of MyPartsListScreen. */
export const MyPartsListSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <View style={styles.statsRow}>
                {[0, 1, 2].map(index => (
                    <View key={index} style={styles.statTile}>
                        <Skeleton height={92} radius={16} />
                    </View>
                ))}
            </View>
            {[0, 1, 2].map(index => (
                <View key={index} style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                    <Skeleton width={96} height={96} radius={14} />
                    <View style={styles.cardBody}>
                        <Skeleton width='38%' height={10} radius={5} />
                        <Skeleton width='85%' height={14} radius={7} />
                        <Skeleton width='60%' height={11} radius={6} />
                        <Skeleton width='32%' height={13} radius={7} />
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 14,
    },
    statTile: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderRadius: 16,
        marginBottom: 10,
    },
    cardBody: {
        flex: 1,
        gap: 8,
        justifyContent: 'center',
    },
})
