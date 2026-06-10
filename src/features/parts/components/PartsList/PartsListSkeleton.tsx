import {StyleSheet, View} from 'react-native'

import {PartCardSkeleton} from '@/global/components/partCard'

const CARDS = [0, 1, 2, 3, 4, 5]

/** First-load placeholder: a two-column grid of part card skeletons. */
export const PartsListSkeleton = () => (
    <View style={styles.grid}>
        {CARDS.map(card => (
            <View key={card} style={styles.item}>
                <PartCardSkeleton />
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 11,
        paddingTop: 4,
    },
    item: {width: '50%', paddingHorizontal: 5, marginBottom: 10},
})
