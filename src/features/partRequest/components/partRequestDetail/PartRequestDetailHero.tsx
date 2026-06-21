import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequest} from '../../types'
import {PartRequestStatusBadge} from '../partRequestsList/PartRequestStatusBadge'

const DAY = 24 * 60 * 60 * 1000
const EXPIRING_WINDOW_DAYS = 7

const T = {
    POSTED_BY: 'نُشر بواسطة',
    NO_IMAGE: 'لا توجد صورة',
    EXPIRED: 'انتهت صلاحية الطلب',
    EXPIRES_TODAY: 'ينتهي اليوم',
    EXPIRES_IN: (n: number) => `ينتهي خلال ${n} يوم`,
}

const formatRelativeTime = (timestamp: number): string => {
    const diff = Date.now() - timestamp
    const hours = Math.floor(diff / 36e5)
    if (hours < 1) return 'منذ دقائق'
    if (hours < 24) return `منذ ${hours} ساعة`
    const days = Math.floor(hours / 24)
    if (days < 7) return `منذ ${days} يوم`
    const weeks = Math.floor(days / 7)
    if (weeks < 4) return `منذ ${weeks} أسبوع`
    const months = Math.floor(days / 30)
    return `منذ ${months} شهر`
}

const expiryLabelFor = (days: number): string => {
    if (days < 0) return T.EXPIRED
    if (days === 0) return T.EXPIRES_TODAY
    return T.EXPIRES_IN(days)
}

interface PartRequestDetailHeroProps {
    request: PartRequest
}

const renderImages = (urls: string[]) => {
    if (urls.length === 1) {
        return <Image source={{uri: urls[0]}} style={styles.singleImage} resizeMode='cover' />
    }
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
            {urls.map(url => (
                <Image key={url} source={{uri: url}} style={styles.galleryImage} resizeMode='cover' />
            ))}
        </ScrollView>
    )
}

export const PartRequestDetailHero = ({request}: PartRequestDetailHeroProps) => {
    const theme = useAppTheme()
    const hasImages = request.imageUrls && request.imageUrls.length > 0

    const expiryDays =
        request.status === 'OPEN' && request.expiresAt != null ? Math.ceil((request.expiresAt - Date.now()) / DAY) : null
    const expiringSoon = expiryDays != null && expiryDays >= 0 && expiryDays <= EXPIRING_WINDOW_DAYS
    const expiryTone = expiringSoon ? theme.colors.tertiary : theme.colors.onSurfaceVariant
    const expiryBg = expiringSoon ? theme.colors.accentSoft : theme.colors.surfaceContainerHigh

    return (
        <View>
            {hasImages ? (
                renderImages(request.imageUrls)
            ) : (
                <View style={[styles.placeholder, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='clipboard-list-outline' size={56} color={theme.colors.primary} />
                    <Text style={[styles.placeholderText, {color: theme.colors.primary}]}>{T.NO_IMAGE}</Text>
                </View>
            )}

            <View style={styles.headerBlock}>
                <View style={styles.badgeRow}>
                    <View style={styles.badgeGroup}>
                        <PartRequestStatusBadge status={request.status} size='md' />
                        {expiryDays != null ? (
                            <View style={[styles.expiry, {backgroundColor: expiryBg}]}>
                                <Icon source='clock-alert-outline' size={11} color={expiryTone} />
                                <Text style={[styles.expiryText, {color: expiryTone}]} numberOfLines={1}>
                                    {expiryLabelFor(expiryDays)}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.metaRow}>
                        <Icon source='clock-outline' size={12} color={theme.colors.onSurfaceVariant} />
                        <Text style={[styles.meta, {color: theme.colors.onSurfaceVariant}]}>
                            {formatRelativeTime(request.createdAt)}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} selectable>
                    {request.title}
                </Text>
                <Text style={[styles.requester, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                    {T.POSTED_BY}{' '}
                    <Text style={[styles.requesterName, {color: theme.colors.primary}]}>{request.requesterName || '—'}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    singleImage: {width: '100%', height: 240},
    gallery: {gap: 8, paddingHorizontal: 12},
    galleryImage: {width: 220, height: 240, borderRadius: 16},
    placeholder: {width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', gap: 6},
    placeholderText: {fontSize: 12, fontWeight: '700'},
    headerBlock: {paddingHorizontal: 16, paddingTop: 16, gap: 8},
    badgeRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8},
    badgeGroup: {flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1},
    expiry: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        flexShrink: 1,
    },
    expiryText: {fontSize: 10.5, fontWeight: '800', letterSpacing: 0.2},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
    meta: {fontSize: 11.5, fontWeight: '600'},
    title: {fontSize: 22, fontWeight: '800', letterSpacing: -0.4, lineHeight: 30},
    requester: {fontSize: 12.5, fontWeight: '500'},
    requesterName: {fontWeight: '800'},
})
