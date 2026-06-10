import React from 'react'
import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'

const TILES = [0, 1, 2, 3, 4, 5]

/** Six pulsing tile placeholders mirroring the category grid layout. */
export const CategoryGridSkeleton = () => (
    <View style={styles.grid}>
        {TILES.map(tile => (
            <View key={tile} style={styles.slot}>
                <Skeleton width='100%' height={128} radius={18} />
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    grid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5},
    slot: {width: '33.3333%', padding: 5},
})
