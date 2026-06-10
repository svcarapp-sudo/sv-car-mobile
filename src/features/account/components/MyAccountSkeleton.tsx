import React from 'react'
import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

/** Placeholder mirroring the account layout (profile header + section cards) while data loads. */
export const MyAccountSkeleton = () => {
    const theme = useAppTheme()

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
                <Skeleton width={60} circle />
                <View style={styles.headerText}>
                    <Skeleton width='55%' height={16} />
                    <Skeleton width='40%' height={12} />
                </View>
            </View>
            <View style={styles.body}>
                <Skeleton height={96} radius={16} />
                <Skeleton height={96} radius={16} />
                <Skeleton height={96} radius={16} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerText: {flex: 1, gap: 8},
    body: {padding: 20, gap: 16},
})
