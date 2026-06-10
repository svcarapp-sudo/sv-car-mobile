import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {themeColors} from '@/global/theme'

/**
 * Loading placeholder mirroring the detail layout: edge-to-edge hero,
 * the title/price card, then two section cards.
 */
export const PartDetailSkeleton = () => (
    <View style={styles.root}>
        <Skeleton width='100%' height={320} radius={0} />
        <View style={styles.content}>
            <View style={styles.infoCard}>
                <Skeleton width='65%' height={18} radius={9} />
                <Skeleton width='40%' height={13} radius={6} />
                <Skeleton width='50%' height={26} radius={10} style={styles.price} />
            </View>
            <Skeleton width='100%' height={96} radius={22} />
            <Skeleton width='100%' height={130} radius={22} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    root: {flex: 1},
    content: {paddingHorizontal: 16, gap: 12},
    infoCard: {
        borderRadius: 22,
        padding: 18,
        gap: 12,
        marginTop: -28,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        backgroundColor: themeColors.surface,
    },
    price: {marginTop: 6},
})
