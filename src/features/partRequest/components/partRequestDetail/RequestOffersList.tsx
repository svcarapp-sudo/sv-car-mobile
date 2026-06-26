import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'

import {FadeSlideIn, showToast, staggerDelay} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import {haptics} from '@/global/utils'

import {useRequestOffers} from '../../hooks'
import {RequestOfferCard} from './RequestOfferCard'

const T = {
    HEADING: 'العروض المستلمة',
    EMPTY: 'لا توجد عروض على طلبك حتى الآن',
    ACCEPTED: 'تم قبول العرض',
    DECLINED: 'تم رفض العرض',
    ERROR: 'تعذّر تحديث العرض',
}

interface RequestOffersListProps {
    requestId: string
    /** Refresh the parent request after an accept (status becomes FULFILLED). */
    onAccepted: () => void
}

/** Owner-only panel listing every offer received, with accept/decline. */
export const RequestOffersList = ({requestId, onAccepted}: RequestOffersListProps) => {
    const theme = useAppTheme()
    const {offers, loading, accept, decline} = useRequestOffers(requestId)
    const [busyId, setBusyId] = useState<number | null>(null)

    const handleAccept = async (offerId: number) => {
        setBusyId(offerId)
        try {
            await accept(offerId)
            haptics.success()
            showToast(T.ACCEPTED, 'success')
            onAccepted()
        } catch {
            showToast(T.ERROR, 'error')
        } finally {
            setBusyId(null)
        }
    }

    const handleDecline = async (offerId: number) => {
        setBusyId(offerId)
        try {
            await decline(offerId)
            haptics.selection()
            showToast(T.DECLINED, 'success')
        } catch {
            showToast(T.ERROR, 'error')
        } finally {
            setBusyId(null)
        }
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.headingRow}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='tag-multiple-outline' size={18} color={theme.colors.primary} />
                </View>
                <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
                {offers.length > 0 && (
                    <View style={[styles.countPill, {backgroundColor: theme.colors.accentSoft}]}>
                        <Text style={[styles.countText, {color: theme.colors.tertiary}]}>{offers.length}</Text>
                    </View>
                )}
            </View>

            {loading && offers.length === 0 ? (
                <ActivityIndicator size='small' color={theme.colors.tertiary} style={styles.loader} />
            ) : offers.length === 0 ? (
                <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{T.EMPTY}</Text>
            ) : (
                <View style={styles.list}>
                    {offers.map((offer, index) => (
                        <FadeSlideIn key={offer.id} delay={index < 6 ? staggerDelay(index) : 0}>
                            <RequestOfferCard
                                offer={offer}
                                busy={busyId === offer.id}
                                onAccept={() => handleAccept(offer.id)}
                                onDecline={() => handleDecline(offer.id)}
                            />
                        </FadeSlideIn>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {marginHorizontal: 16, marginTop: 14, borderRadius: 18, padding: 16, ...shadows.md, shadowColor: themeColors.shadow},
    headingRow: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12},
    iconWrap: {width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center'},
    heading: {flex: 1, fontSize: 15, fontWeight: '800', letterSpacing: -0.2},
    countPill: {minWidth: 24, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, alignItems: 'center'},
    countText: {fontSize: 12, fontWeight: '800'},
    loader: {paddingVertical: 20},
    empty: {fontSize: 13, fontWeight: '600', textAlign: 'center', paddingVertical: 16, lineHeight: 19},
    list: {gap: 10},
})
