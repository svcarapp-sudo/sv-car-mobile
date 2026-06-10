import React from 'react'
import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {themeColors} from '@/global/theme'

/** Three card-shaped placeholders mirroring the horizontal recommendations rail. */
export const RecommendedRailSkeleton = () => (
    <View style={styles.row}>
        {[0, 1, 2].map(index => (
            <View key={index} style={styles.card}>
                <Skeleton width='100%' height={110} radius={0} />
                <View style={styles.body}>
                    <Skeleton width='85%' height={12} radius={6} />
                    <Skeleton width='55%' height={12} radius={6} />
                </View>
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    row: {flexDirection: 'row', paddingHorizontal: 18},
    card: {
        width: 150,
        marginEnd: 12,
        borderRadius: 18,
        backgroundColor: themeColors.surface,
        overflow: 'hidden',
    },
    body: {padding: 11, gap: 6},
})
