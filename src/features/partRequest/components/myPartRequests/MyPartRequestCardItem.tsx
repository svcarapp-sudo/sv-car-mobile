import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {CategoryArt, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import type {PartRequest, PartRequestStatus} from '../../types'
import {PartRequestCardFooter} from '../partRequestsList/PartRequestCardFooter'
import {PartRequestStatusBadge} from '../partRequestsList/PartRequestStatusBadge'
import {MyPartRequestCardMenu} from './MyPartRequestCardMenu'

const DAY = 24 * 60 * 60 * 1000
const EXPIRING_WINDOW_DAYS = 7
const T = {EXPIRING: 'ينتهي قريباً'}

const formatVehicle = (r: PartRequest) => `${r.makeName || ''} ${r.modelName || ''} ${r.year}`.trim()

interface MyPartRequestCardItemProps {
    request: PartRequest
    onPress: () => void
    onDelete: () => void
    onStatusChange: (status: PartRequestStatus) => void
}

/**
 * Own-request status card: a status-coloured edge rail + badge keep state
 * legible at a glance, an amber flag warns when an open request nears expiry,
 * the kebab carries transitions and the footer the budget ledger.
 */
export const MyPartRequestCardItem = ({request, onPress, onDelete, onStatusChange}: MyPartRequestCardItemProps) => {
    const theme = useAppTheme()
    const thumb = request.imageUrls?.[0]
    const railColor = {
        OPEN: theme.colors.success,
        FULFILLED: theme.colors.info,
        CLOSED: theme.colors.outline,
    }[request.status]

    const daysToExpiry = request.expiresAt != null ? Math.ceil((request.expiresAt - Date.now()) / DAY) : null
    const expiringSoon =
        request.status === 'OPEN' && daysToExpiry != null && daysToExpiry >= 0 && daysToExpiry <= EXPIRING_WINDOW_DAYS

    return (
        <PressableScale
            onPress={onPress}
            containerStyle={styles.cardContainer}
            style={[styles.card, {backgroundColor: theme.colors.surface}]}
            accessibilityRole='button'
            accessibilityLabel={request.title}>
            <View style={styles.cardInner}>
                <View style={[styles.rail, {backgroundColor: railColor}]} pointerEvents='none' />
                <View style={styles.top}>
                    <View style={styles.topLeft}>
                        <PartRequestStatusBadge status={request.status} size='md' />
                        {expiringSoon ? (
                            <View style={[styles.expiry, {backgroundColor: theme.colors.accentSoft}]}>
                                <Icon source='clock-alert-outline' size={11} color={theme.colors.tertiary} />
                                <Text style={[styles.expiryText, {color: theme.colors.tertiary}]} numberOfLines={1}>
                                    {T.EXPIRING}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    <MyPartRequestCardMenu status={request.status} onStatusChange={onStatusChange} onDelete={onDelete} />
                </View>
                <View style={styles.body}>
                    <View style={styles.thumbBox}>
                        {thumb ? (
                            <Image source={{uri: thumb}} style={styles.thumb} resizeMode='cover' />
                        ) : (
                            <View style={[styles.thumbArt, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                                <CategoryArt slug={request.categorySlug ?? 'other'} size={60} />
                            </View>
                        )}
                    </View>
                    <View style={styles.info}>
                        {request.categoryName ? (
                            <View style={[styles.chip, {backgroundColor: theme.colors.primaryContainer}]}>
                                <Text style={[styles.chipText, {color: theme.colors.primary}]} numberOfLines={1}>
                                    {request.categoryName}
                                </Text>
                            </View>
                        ) : null}
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
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 14,
        paddingEnd: 6,
        paddingTop: 10,
    },
    topLeft: {flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1},
    expiry: {flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999},
    expiryText: {fontSize: 9.5, fontWeight: '800', letterSpacing: 0.2},
    body: {flexDirection: 'row', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12, gap: 12},
    thumbBox: {width: 84, height: 84, borderRadius: 14, overflow: 'hidden'},
    thumb: {width: '100%', height: '100%'},
    thumbArt: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
    info: {flex: 1, gap: 5},
    chip: {alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, maxWidth: '100%'},
    chipText: {fontSize: 10, fontWeight: '800', letterSpacing: 0.1},
    title: {fontSize: 14.5, fontWeight: '800', lineHeight: 20, letterSpacing: -0.2},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 'auto'},
    vehicleText: {fontSize: 11.5, fontWeight: '600', flex: 1},
})
