import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

const ACTIONS = [
    {key: 'add', icon: 'plus-box-outline', label: 'إضافة قطعة'},
    {key: 'inventory', icon: 'package-variant-closed', label: 'مخزوني'},
    {key: 'requests', icon: 'clipboard-search-outline', label: 'الطلبات'},
    {key: 'offers', icon: 'tag-text-outline', label: 'عروضي'},
] as const

export type QuickActionKey = (typeof ACTIONS)[number]['key']

interface Props {
    onPress: (key: QuickActionKey) => void
}

/** Four primary destinations for the seller, as compact icon tiles. */
export const SellerQuickActions = ({onPress}: Props) => {
    const theme = useAppTheme()
    return (
        <View style={styles.row}>
            {ACTIONS.map(a => (
                <PressableScale
                    key={a.key}
                    withHaptic
                    onPress={() => onPress(a.key)}
                    containerStyle={styles.item}
                    style={[styles.tile, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                    <View style={[styles.iconChip, {backgroundColor: theme.colors.primaryContainer}]}>
                        <Icon source={a.icon} size={20} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.label, {color: theme.colors.onSurface}]} numberOfLines={1}>
                        {a.label}
                    </Text>
                </PressableScale>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', gap: 10},
    item: {flex: 1},
    tile: {alignItems: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 6, borderRadius: 16, borderWidth: 1},
    iconChip: {width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
    label: {fontSize: 11.5, fontWeight: '700'},
})
