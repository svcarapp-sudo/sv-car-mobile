import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** First-load placeholder mirroring the request cards of PartRequestsListScreen. */
export const PartRequestsListSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            {[0, 1, 2, 3].map(index => (
                <View key={index} style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                    <Skeleton width={96} height={96} radius={14} />
                    <View style={styles.body}>
                        <View style={styles.badgeRow}>
                            <Skeleton width={64} height={18} radius={999} />
                            <Skeleton width={52} height={18} radius={999} />
                        </View>
                        <Skeleton width='88%' height={14} radius={7} />
                        <Skeleton width='55%' height={11} radius={6} />
                        <Skeleton width='42%' height={13} radius={7} />
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
    },
    card: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    body: {
        flex: 1,
        gap: 8,
        justifyContent: 'center',
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
