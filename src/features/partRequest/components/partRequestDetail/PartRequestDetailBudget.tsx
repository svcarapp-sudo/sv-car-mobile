import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequestCondition, PartRequest} from '../../types'

const CURRENCY = 'ر.س'

const CONDITION: Record<PartRequestCondition, {label: string; icon: string}> = {
    NEW: {label: 'جديد فقط', icon: 'star-shooting-outline'},
    USED: {label: 'مستعمل مقبول', icon: 'recycle'},
    ANY: {label: 'أي حالة', icon: 'check-all'},
}

const T = {
    BUDGET: 'الميزانية',
    CONDITION: 'الحالة المطلوبة',
    LOCATION: 'الموقع',
    OPEN_BUDGET: 'مفتوحة',
    MIN: 'الحد الأدنى',
    MAX: 'الحد الأعلى',
}

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

interface PartRequestDetailBudgetProps {
    request: PartRequest
}

export const PartRequestDetailBudget = ({request}: PartRequestDetailBudgetProps) => {
    const theme = useAppTheme()
    const cond = CONDITION[request.conditionPreference]
    const hasBudget = request.budgetMin != null || request.budgetMax != null

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={[styles.budgetBlock, {backgroundColor: theme.colors.accentSubtle}]}>
                <View style={styles.budgetLeft}>
                    <Icon source='cash-multiple' size={20} color={theme.colors.tertiary} />
                    <Text style={[styles.budgetLabel, {color: theme.colors.onSurfaceVariant}]}>{T.BUDGET}</Text>
                </View>
                {hasBudget ? (
                    <View style={styles.budgetValues}>
                        {request.budgetMin != null && (
                            <Text style={[styles.budgetValue, {color: themeColors.textPrice}]}>
                                {formatNumber(request.budgetMin)} <Text style={styles.currency}>{CURRENCY}</Text>
                            </Text>
                        )}
                        {request.budgetMin != null && request.budgetMax != null && (
                            <Text style={[styles.dash, {color: theme.colors.onSurfaceVariant}]}>—</Text>
                        )}
                        {request.budgetMax != null && (
                            <Text style={[styles.budgetValue, {color: themeColors.textPrice}]}>
                                {formatNumber(request.budgetMax)} <Text style={styles.currency}>{CURRENCY}</Text>
                            </Text>
                        )}
                    </View>
                ) : (
                    <Text style={[styles.openBudget, {color: theme.colors.tertiary}]}>{T.OPEN_BUDGET}</Text>
                )}
            </View>

            <View style={styles.metaRow}>
                <View style={styles.metaCell}>
                    <View style={[styles.metaIcon, {backgroundColor: theme.colors.infoContainer}]}>
                        <Icon source={cond.icon} size={16} color={theme.colors.info} />
                    </View>
                    <View style={styles.metaText}>
                        <Text style={[styles.metaLabel, {color: theme.colors.onSurfaceVariant}]}>{T.CONDITION}</Text>
                        <Text style={[styles.metaValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {cond.label}
                        </Text>
                    </View>
                </View>
                <View style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />
                <View style={styles.metaCell}>
                    <View style={[styles.metaIcon, {backgroundColor: theme.colors.successContainer}]}>
                        <Icon source='map-marker-outline' size={16} color={theme.colors.success} />
                    </View>
                    <View style={styles.metaText}>
                        <Text style={[styles.metaLabel, {color: theme.colors.onSurfaceVariant}]}>{T.LOCATION}</Text>
                        <Text style={[styles.metaValue, {color: theme.colors.onSurface}]} numberOfLines={1}>
                            {request.city || '—'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 18,
        overflow: 'hidden',
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    budgetBlock: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetLeft: {flexDirection: 'row', alignItems: 'center', gap: 8},
    budgetLabel: {fontSize: 13, fontWeight: '700'},
    budgetValues: {flexDirection: 'row', alignItems: 'baseline', gap: 6},
    budgetValue: {fontSize: 17, fontWeight: '800', letterSpacing: -0.3},
    currency: {fontSize: 11, fontWeight: '700'},
    dash: {fontSize: 13},
    openBudget: {fontSize: 14, fontWeight: '700'},
    metaRow: {flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10},
    metaCell: {flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10},
    metaIcon: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center'},
    metaText: {flex: 1, gap: 2},
    metaLabel: {fontSize: 10.5, fontWeight: '600'},
    metaValue: {fontSize: 13, fontWeight: '700'},
    divider: {width: 1, height: 36},
})
