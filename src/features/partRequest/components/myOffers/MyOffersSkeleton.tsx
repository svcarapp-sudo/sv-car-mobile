import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'

/** Placeholder cascade while the seller's offers load. */
export const MyOffersSkeleton = () => (
    <View style={styles.wrapper}>
        {[0, 1, 2, 3].map(i => (
            <View key={i} style={styles.card}>
                <Skeleton width='70%' height={16} radius={8} />
                <Skeleton width='40%' height={14} radius={7} />
                <Skeleton width='35%' height={12} radius={6} />
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    wrapper: {paddingHorizontal: 12, paddingTop: 12, gap: 12},
    card: {borderRadius: 18, padding: 14, gap: 10},
})
