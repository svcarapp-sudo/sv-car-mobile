import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {PlanEntitlement} from '@/global/types'

const ARABIC = {
    PLAN_BENEFITS: 'مزايا الخطة',
    ENABLED: 'مفعّل',
    DISABLED: 'معطّل',
}

const ENTITLEMENT_LABELS: Record<string, string> = {
    max_parts: 'الحد الأقصى للقطع',
    can_sell: 'إمكانية البيع',
    featured_parts: 'القطع المميزة',
    store_page: 'صفحة المتجر',
    analytics: 'التحليلات',
}

const ENTITLEMENT_ICONS: Record<string, string> = {
    max_parts: 'package-variant',
    can_sell: 'store',
    featured_parts: 'star',
    store_page: 'storefront',
    analytics: 'chart-line',
}

interface SubscriptionEntitlementsProps {
    entitlements: PlanEntitlement[]
}

export const SubscriptionEntitlements = ({entitlements}: SubscriptionEntitlementsProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.entitlements, {borderTopColor: theme.colors.outlineVariant}]}>
            <Text variant='labelLarge' style={[styles.entitlementsTitle, {color: theme.colors.onSurface}]}>
                {ARABIC.PLAN_BENEFITS}
            </Text>
            {entitlements.map(e => (
                <EntitlementRow key={e.id} entitlement={e} />
            ))}
        </View>
    )
}

const EntitlementRow = ({entitlement: e}: {entitlement: PlanEntitlement}) => {
    const theme = useAppTheme()
    const icon = ENTITLEMENT_ICONS[e.entitlementKey] ?? 'check-circle-outline'
    const label = ENTITLEMENT_LABELS[e.entitlementKey] ?? e.entitlementKey
    const isEnabled = e.entitlementType === 'FLAG' ? e.valueFlag : true
    const value =
        e.entitlementType === 'FLAG'
            ? e.valueFlag ? ARABIC.ENABLED : ARABIC.DISABLED
            : e.valueLimit != null ? String(e.valueLimit) : '—'

    return (
        <View style={styles.entitlementRow}>
            <View style={styles.entitlementLeft}>
                <Icon source={icon} size={18} color={isEnabled ? theme.colors.primary : theme.colors.onSurfaceDisabled} />
                <Text
                    variant='bodyMedium'
                    style={{color: isEnabled ? theme.colors.onSurface : theme.colors.onSurfaceDisabled, flex: 1}}>
                    {label}
                </Text>
            </View>
            <View
                style={[
                    styles.valueChip,
                    {backgroundColor: isEnabled ? theme.colors.primaryContainer : theme.colors.surfaceDisabled},
                ]}>
                <Text
                    variant='labelSmall'
                    style={{color: isEnabled ? theme.colors.primary : theme.colors.onSurfaceDisabled, fontWeight: '600'}}>
                    {value}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    entitlements: {borderTopWidth: 1, padding: 16},
    entitlementsTitle: {fontWeight: '600', marginBottom: 12},
    entitlementRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8},
    entitlementLeft: {flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1},
    valueChip: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, minWidth: 40, alignItems: 'center'},
})
