import {StyleSheet, View} from 'react-native'

import {themeColors} from '@/global/theme'

import {Skeleton} from '../skeleton'

/**
 * Loading placeholder mirroring the PartCardGrid anatomy:
 * square image block, two name lines, then the price line.
 */
export const PartCardSkeleton = () => (
    <View style={styles.card}>
        <View style={styles.media}>
            <Skeleton width='100%' height='100%' radius={0} />
        </View>
        <View style={styles.body}>
            <Skeleton width='92%' height={12} radius={6} />
            <Skeleton width='60%' height={12} radius={6} />
            <Skeleton width='45%' height={15} radius={7} style={styles.price} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        backgroundColor: themeColors.surface,
        overflow: 'hidden',
    },
    media: {aspectRatio: 1},
    body: {padding: 12, gap: 7},
    price: {marginTop: 4},
})
