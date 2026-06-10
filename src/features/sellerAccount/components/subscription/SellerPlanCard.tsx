import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {SellerSummary} from '../../types'

const ARABIC = {
    TITLE: 'الاشتراك',
    PLAN: 'الخطة',
    BILLING: 'فترة الفوترة',
    ACTIVE: 'نشط',
    FREE: 'مجاني',
    NONE_TITLE: 'الخطة المجانية',
    NONE_DESC: 'أنت على الخطة المجانية. قم بالترقية للوصول إلى مزايا البائع المميزة.',
}

const BILLING_LABELS: Record<string, string> = {FREE: 'مجاني', NONE: 'بدون', MONTHLY: 'شهري', YEARLY: 'سنوي'}

interface SellerPlanCardProps {
    summary: SellerSummary
}

export const SellerPlanCard = ({summary}: SellerPlanCardProps) => {
    const theme = useAppTheme()
    const active = summary.hasActiveSubscription
    const price = summary.subscriptionPrice ?? 0
    const billing = summary.subscriptionBillingPeriod ?? 'FREE'

    return (
        <View>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC.TITLE}
            </Text>

            {active ? (
                <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                    <View style={styles.header}>
                        <View style={styles.nameRow}>
                            <Icon source='shield-star-outline' size={22} color={theme.colors.primary} />
                            <Text
                                variant='titleMedium'
                                style={[styles.planName, {color: theme.colors.onSurface}]}
                                numberOfLines={1}>
                                {summary.subscriptionPlanName}
                            </Text>
                        </View>
                        <View style={[styles.statusChip, {backgroundColor: theme.colors.successContainer}]}>
                            <Text variant='labelSmall' style={{color: theme.colors.success}}>
                                {ARABIC.ACTIVE}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.detailsRow, {borderTopColor: theme.colors.outlineVariant}]}>
                        <Detail
                            label={ARABIC.PLAN}
                            value={price === 0 ? ARABIC.FREE : `$${price}`}
                            color={theme.colors.primary}
                            theme={theme}
                        />
                        <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />
                        <Detail
                            label={ARABIC.BILLING}
                            value={BILLING_LABELS[billing] ?? billing}
                            color={theme.colors.onSurface}
                            theme={theme}
                        />
                    </View>
                </View>
            ) : (
                <View style={[styles.card, styles.freeCard, {backgroundColor: theme.colors.surface}]}>
                    <Icon source='shield-outline' size={26} color={theme.colors.onSurfaceVariant} />
                    <View style={styles.freeText}>
                        <Text variant='titleSmall' style={[styles.planName, {color: theme.colors.onSurface}]}>
                            {ARABIC.NONE_TITLE}
                        </Text>
                        <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                            {ARABIC.NONE_DESC}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    )
}

interface DetailProps {
    label: string
    value: string
    color: string
    theme: ReturnType<typeof useAppTheme>
}

const Detail = ({label, value, color, theme}: DetailProps) => (
    <View style={styles.detail}>
        <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
            {label}
        </Text>
        <Text variant='bodyMedium' style={[styles.detailValue, {color}]}>
            {value}
        </Text>
    </View>
)

const cardShadow = {
    shadowColor: themeColors.shadow,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
}

const styles = StyleSheet.create({
    title: {fontWeight: '700', marginBottom: 14},
    card: {borderRadius: 16, ...cardShadow},
    header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, gap: 10},
    nameRow: {flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1},
    planName: {fontWeight: '700', flexShrink: 1},
    statusChip: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10},
    detailsRow: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
    detail: {flex: 1, alignItems: 'center', paddingVertical: 14},
    divider: {width: 1, height: 30},
    detailValue: {fontWeight: '700', marginTop: 4},
    freeCard: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16},
    freeText: {flex: 1, gap: 2},
})
