import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Plan, PlanEntitlement} from '@/global/types'

const ARABIC = {
    SUBSCRIPTION: 'الاشتراك',
    CURRENT_PLAN: 'الخطة الحالية',
    PLAN_BENEFITS: 'مزايا الخطة',
    NO_SUBSCRIPTION: 'لا يوجد اشتراك حالي',
    FREE: 'مجاني',
    ACTIVE: 'نشط',
    BILLING: 'فترة الفوترة',
    ENABLED: 'مفعّل',
    DISABLED: 'معطّل',
}

const BILLING_LABELS: Record<string, string> = {NONE: 'بدون', MONTHLY: 'شهري', YEARLY: 'سنوي'}

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

interface SubscriptionCardProps {
    plan: Plan | null
}

export const SubscriptionCard = ({plan}: SubscriptionCardProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                {ARABIC.SUBSCRIPTION}
            </Text>

            {plan ? (
                <View style={[styles.card, {backgroundColor: theme.colors.elevation.level2, borderColor: theme.colors.outlineVariant}]}>
                    <View style={styles.header}>
                        <View style={styles.nameRow}>
                            <Icon source='shield-star-outline' size={24} color={theme.colors.primary} />
                            <Text variant='titleLarge' style={[styles.planName, {color: theme.colors.onSurface}]}>
                                {plan.name}
                            </Text>
                        </View>
                        <View style={[styles.statusChip, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Text variant='labelSmall' style={{color: theme.colors.primary}}>
                                {ARABIC.ACTIVE}
                            </Text>
                        </View>
                    </View>

                    {plan.description && (
                        <Text variant='bodySmall' style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>
                            {plan.description}
                        </Text>
                    )}

                    <View style={[styles.detailsRow, {borderTopColor: theme.colors.outlineVariant}]}>
                        <View style={styles.detail}>
                            <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                                {ARABIC.CURRENT_PLAN}
                            </Text>
                            <Text variant='bodyMedium' style={[styles.detailValue, {color: theme.colors.primary}]}>
                                {plan.price === 0 ? ARABIC.FREE : `$${plan.price}`}
                            </Text>
                        </View>
                        <View style={[styles.detailDivider, {backgroundColor: theme.colors.outlineVariant}]} />
                        <View style={styles.detail}>
                            <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                                {ARABIC.BILLING}
                            </Text>
                            <Text variant='bodyMedium' style={[styles.detailValue, {color: theme.colors.onSurface}]}>
                                {BILLING_LABELS[plan.billingPeriod] ?? plan.billingPeriod}
                            </Text>
                        </View>
                    </View>

                    {plan.entitlements && plan.entitlements.length > 0 && (
                        <View style={[styles.entitlements, {borderTopColor: theme.colors.outlineVariant}]}>
                            <Text variant='labelLarge' style={[styles.entitlementsTitle, {color: theme.colors.onSurface}]}>
                                {ARABIC.PLAN_BENEFITS}
                            </Text>
                            {plan.entitlements.map(e => (
                                <EntitlementRow key={e.id} entitlement={e} />
                            ))}
                        </View>
                    )}
                </View>
            ) : (
                <View style={[styles.emptyCard, {backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.outlineVariant}]}>
                    <Icon source='information-outline' size={24} color={theme.colors.onSurfaceVariant} />
                    <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, flex: 1}}>
                        {ARABIC.NO_SUBSCRIPTION}
                    </Text>
                </View>
            )}
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
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    card: {borderRadius: 16, borderWidth: 1, overflow: 'hidden'},
    header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16},
    nameRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
    planName: {fontWeight: '700'},
    statusChip: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10},
    description: {paddingHorizontal: 16, paddingBottom: 12},
    detailsRow: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
    detail: {flex: 1, alignItems: 'center', paddingVertical: 14},
    detailDivider: {width: 1, height: 30},
    detailValue: {fontWeight: '700', marginTop: 4},
    entitlements: {borderTopWidth: 1, padding: 16},
    entitlementsTitle: {fontWeight: '600', marginBottom: 12},
    entitlementRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8},
    entitlementLeft: {flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1},
    valueChip: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, minWidth: 40, alignItems: 'center'},
    emptyCard: {flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 12, borderWidth: 1, gap: 12},
})
