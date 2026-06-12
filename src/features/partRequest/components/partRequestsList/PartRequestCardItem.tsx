import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequestCondition, PartRequest} from '../../types'
import {PartRequestStatusBadge} from './PartRequestStatusBadge'

const CURRENCY = 'ر.س'
const RECENT_WINDOW_MS = 48 * 60 * 60 * 1000

const CONDITION_LABEL: Record<PartRequestCondition, string> = {
    NEW: 'جديد',
    USED: 'مستعمل',
    ANY: 'أي حالة',
}

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

const formatBudget = (min?: number | null, max?: number | null): string => {
    if (min != null && max != null) return `${formatNumber(min)} - ${formatNumber(max)} ${CURRENCY}`
    if (max != null) return `حتى ${formatNumber(max)} ${CURRENCY}`
    if (min != null) return `من ${formatNumber(min)} ${CURRENCY}`
    return 'الميزانية مفتوحة'
}

const formatVehicle = (request: PartRequest) => {
    const make = request.makeName || ''
    const model = request.modelName || ''
    return `${make} ${model} ${request.year}`.trim()
}

interface PartRequestCardItemProps {
    request: PartRequest
    onPress: () => void
}

export const PartRequestCardItem = ({request, onPress}: PartRequestCardItemProps) => {
    const theme = useAppTheme()
    const isRecent = Date.now() - request.createdAt < RECENT_WINDOW_MS
    const thumb = request.imageUrls?.[0]

    return (
        <PressableScale
            onPress={onPress}
            containerStyle={styles.cardContainer}
            style={[styles.card, {backgroundColor: theme.colors.surface}]}
            accessibilityRole='button'
            accessibilityLabel={`${request.title}، ${formatVehicle(request)}`}>
            <View style={styles.cardInner}>
                <View style={styles.body}>
                    <View style={styles.thumbBox}>
                        {thumb ? (
                            <Image source={{uri: thumb}} style={styles.thumb} resizeMode='cover' />
                        ) : (
                            <View style={[styles.thumbPlaceholder, {backgroundColor: theme.colors.primaryContainer}]}>
                                <Icon source='clipboard-list-outline' size={28} color={theme.colors.primary} />
                            </View>
                        )}
                        {isRecent && (
                            <View style={[styles.recentPill, {backgroundColor: theme.colors.tertiary}]}>
                                <Text style={[styles.recentText, {color: theme.colors.onTertiary}]}>جديد</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.info}>
                        <View style={styles.topRow}>
                            <PartRequestStatusBadge status={request.status} />
                            <View style={[styles.condPill, {backgroundColor: theme.colors.accentSubtle}]}>
                                <Text style={[styles.condText, {color: theme.colors.tertiary}]}>
                                    {CONDITION_LABEL[request.conditionPreference]}
                                </Text>
                            </View>
                        </View>

                        <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
                            {request.title}
                        </Text>

                        <View style={styles.vehicleRow}>
                            <Icon source='shield-car' size={12} color={theme.colors.success} />
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {formatVehicle(request)}
                            </Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={[styles.budget, {color: themeColors.textPrice}]} numberOfLines={1}>
                                {formatBudget(request.budgetMin, request.budgetMax)}
                            </Text>
                            {request.city ? (
                                <View style={styles.cityRow}>
                                    <Icon source='map-marker-outline' size={12} color={theme.colors.onSurfaceVariant} />
                                    <Text style={[styles.city, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                        {request.city}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    cardContainer: {marginHorizontal: 12, marginBottom: 12},
    card: {borderRadius: 16, ...shadows.md},
    cardInner: {borderRadius: 16, overflow: 'hidden'},
    body: {flexDirection: 'row', padding: 12, gap: 12},
    thumbBox: {width: 96, height: 96, borderRadius: 14, overflow: 'hidden', position: 'relative'},
    thumb: {width: '100%', height: '100%'},
    thumbPlaceholder: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
    recentPill: {position: 'absolute', top: 6, end: 6, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999},
    recentText: {fontSize: 9, fontWeight: '800', letterSpacing: 0.3},
    info: {flex: 1, gap: 6, justifyContent: 'space-between'},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6},
    condPill: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999},
    condText: {fontSize: 10, fontWeight: '700'},
    title: {fontSize: 14, fontWeight: '700', lineHeight: 19},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
    vehicleText: {fontSize: 11, fontWeight: '500', flex: 1},
    bottomRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 6},
    budget: {fontSize: 13, fontWeight: '800', letterSpacing: -0.2, flexShrink: 1},
    cityRow: {flexDirection: 'row', alignItems: 'center', gap: 2},
    city: {fontSize: 11, fontWeight: '600', maxWidth: 90},
})
