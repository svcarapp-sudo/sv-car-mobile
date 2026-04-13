import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Plan} from '@/global/types'
import {SubscriptionEntitlements} from './SubscriptionEntitlements'

const ARABIC = {
    SUBSCRIPTION: 'الاشتراك',
    CURRENT_PLAN: 'الخطة الحالية',
    NO_SUBSCRIPTION: 'لا يوجد اشتراك حالي',
    FREE: 'مجاني',
    ACTIVE: 'نشط',
    BILLING: 'فترة الفوترة',
}

const BILLING_LABELS: Record<string, string> = {NONE: 'بدون', MONTHLY: 'شهري', YEARLY: 'سنوي'}

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
                <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
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
                        <SubscriptionEntitlements entitlements={plan.entitlements} />
                    )}
                </View>
            ) : (
                <View style={[styles.emptyCard, {backgroundColor: theme.colors.surface}]}>
                    <Icon source='information-outline' size={24} color={theme.colors.onSurfaceVariant} />
                    <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, flex: 1}}>
                        {ARABIC.NO_SUBSCRIPTION}
                    </Text>
                </View>
            )}
        </View>
    )
}

const cardShadow = {
    shadowColor: themeColors.shadow,
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.45,
    shadowRadius: 36,
    elevation: 24,
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    card: {borderRadius: 16, ...cardShadow},
    header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16},
    nameRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
    planName: {fontWeight: '700'},
    statusChip: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10},
    description: {paddingHorizontal: 16, paddingBottom: 12},
    detailsRow: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
    detail: {flex: 1, alignItems: 'center', paddingVertical: 14},
    detailDivider: {width: 1, height: 30},
    detailValue: {fontWeight: '700', marginTop: 4},
    emptyCard: {flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 12, gap: 12, ...cardShadow},
})
