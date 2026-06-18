import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {CategoryArt, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import type {PartRequestCondition, PartRequest} from '../../types'
import {PartRequestCardFooter} from './PartRequestCardFooter'

const RECENT_WINDOW_MS = 48 * 60 * 60 * 1000

const CONDITION_LABEL: Record<PartRequestCondition, string> = {
    NEW: 'جديد',
    USED: 'مستعمل',
    ANY: 'أي حالة',
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

/**
 * Request dossier card: category art stands in for missing photos, an amber
 * rail marks the card edge, and the ledger footer carries budget + meta.
 */
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
                <View style={[styles.rail, {backgroundColor: theme.colors.tertiary}]} pointerEvents='none' />
                <View style={styles.body}>
                    <View style={styles.thumbBox}>
                        {thumb ? (
                            <Image source={{uri: thumb}} style={styles.thumb} resizeMode='cover' />
                        ) : (
                            <View style={[styles.thumbArt, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                                <CategoryArt slug={request.categorySlug ?? 'other'} size={74} />
                            </View>
                        )}
                        {isRecent && (
                            <View style={[styles.recentPill, {backgroundColor: theme.colors.tertiary}]}>
                                <Text style={[styles.recentText, {color: theme.colors.onTertiary}]}>جديد</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.info}>
                        <View style={styles.chipsRow}>
                            {request.categoryName ? (
                                <View style={[styles.chip, {backgroundColor: theme.colors.primaryContainer}]}>
                                    <Text style={[styles.chipText, {color: theme.colors.primary}]} numberOfLines={1}>
                                        {request.categoryName}
                                    </Text>
                                </View>
                            ) : null}
                            <View style={[styles.chip, {backgroundColor: theme.colors.accentSoft}]}>
                                <Text style={[styles.chipText, {color: theme.colors.tertiary}]} numberOfLines={1}>
                                    {CONDITION_LABEL[request.conditionPreference]}
                                </Text>
                            </View>
                        </View>

                        <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
                            {request.title}
                        </Text>

                        <View style={styles.vehicleRow}>
                            <Icon source='car-side' size={13} color={theme.colors.secondary} />
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {formatVehicle(request)}
                            </Text>
                        </View>
                    </View>
                </View>

                <PartRequestCardFooter
                    budgetMin={request.budgetMin}
                    budgetMax={request.budgetMax}
                    city={request.city}
                    createdAt={request.createdAt}
                />
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    cardContainer: {marginHorizontal: 12, marginBottom: 12},
    card: {borderRadius: 18, ...shadows.md},
    cardInner: {borderRadius: 18, overflow: 'hidden'},
    rail: {position: 'absolute', start: 0, top: 18, bottom: 18, width: 3.5, borderTopEndRadius: 4, borderBottomEndRadius: 4},
    body: {flexDirection: 'row', padding: 12, gap: 12},
    thumbBox: {width: 96, height: 96, borderRadius: 14, overflow: 'hidden', position: 'relative'},
    thumb: {width: '100%', height: '100%'},
    thumbArt: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
    recentPill: {position: 'absolute', top: 6, end: 6, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999},
    recentText: {fontSize: 9, fontWeight: '800', letterSpacing: 0.3},
    info: {flex: 1, gap: 5},
    chipsRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    chip: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, flexShrink: 1},
    chipText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.1},
    title: {fontSize: 14.5, fontWeight: '800', lineHeight: 20, letterSpacing: -0.2},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 'auto'},
    vehicleText: {fontSize: 11.5, fontWeight: '600', flex: 1},
})
