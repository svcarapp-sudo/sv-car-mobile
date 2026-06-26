import {Linking, StyleSheet, View} from 'react-native'
import {Button, Icon, IconButton, Text} from 'react-native-paper'

import {PriceTag, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {Offer} from '@/global/types'
import {haptics} from '@/global/utils'

import {OfferStatusBadge} from '../OfferStatusBadge'

const T = {
    UNKNOWN_SELLER: 'بائع',
    ACCEPT: 'قبول',
    DECLINE: 'رفض',
    LINKED: 'القطعة المرتبطة',
    FAILED: 'تعذّر فتح التطبيق',
}

const normalisePhone = (raw: string): string => raw.replace(/[^\d+]/g, '')

interface RequestOfferCardProps {
    offer: Offer
    busy: boolean
    onAccept: () => void
    onDecline: () => void
}

/** One offer received on the buyer's request, with accept/decline + contact. */
export const RequestOfferCard = ({offer, busy, onAccept, onDecline}: RequestOfferCardProps) => {
    const theme = useAppTheme()
    const sellerLabel = offer.sellerStoreName || offer.sellerName || T.UNKNOWN_SELLER
    const phone = offer.contactPhone ? normalisePhone(offer.contactPhone) : ''

    const openLink = async (url: string) => {
        haptics.light()
        try {
            if (await Linking.canOpenURL(url)) {
                await Linking.openURL(url)
            } else {
                showToast(T.FAILED, 'error')
            }
        } catch {
            showToast(T.FAILED, 'error')
        }
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surfaceContainerLow}]}>
            <View style={styles.headRow}>
                <View style={styles.sellerInfo}>
                    <Text style={[styles.seller, {color: theme.colors.onSurface}]} numberOfLines={1}>
                        {sellerLabel}
                    </Text>
                    {offer.sellerCity ? (
                        <Text style={[styles.city, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {offer.sellerCity}
                        </Text>
                    ) : null}
                </View>
                <OfferStatusBadge status={offer.status} />
            </View>

            <View style={styles.priceRow}>
                <PriceTag price={offer.price} size='lg' />
                {phone.length > 0 && (
                    <View style={styles.contactBtns}>
                        <IconButton
                            icon='whatsapp'
                            size={20}
                            mode='contained'
                            containerColor={theme.colors.successContainer}
                            iconColor={theme.colors.success}
                            onPress={() => openLink(`https://wa.me/${phone.replace(/^\+/, '')}`)}
                        />
                        <IconButton
                            icon='phone-outline'
                            size={20}
                            mode='contained'
                            containerColor={theme.colors.primaryContainer}
                            iconColor={theme.colors.primary}
                            onPress={() => openLink(`tel:${phone}`)}
                        />
                    </View>
                )}
            </View>

            {offer.message ? <Text style={[styles.message, {color: theme.colors.onSurfaceVariant}]}>{offer.message}</Text> : null}

            {offer.linkedPartName ? (
                <View style={styles.linkedRow}>
                    <Icon source='link-variant' size={13} color={theme.colors.tertiary} />
                    <Text style={[styles.linkedText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {offer.linkedPartName}
                    </Text>
                </View>
            ) : null}

            {offer.status === 'PENDING' && (
                <View style={styles.actions}>
                    <Button
                        mode='contained'
                        onPress={onAccept}
                        disabled={busy}
                        buttonColor={theme.colors.success}
                        textColor={theme.colors.onPrimary}
                        icon='check'
                        style={styles.actionBtn}>
                        {T.ACCEPT}
                    </Button>
                    <Button
                        mode='outlined'
                        onPress={onDecline}
                        disabled={busy}
                        textColor={theme.colors.error}
                        icon='close'
                        style={[styles.actionBtn, {borderColor: theme.colors.error}]}>
                        {T.DECLINE}
                    </Button>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 16, padding: 14, gap: 10},
    headRow: {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10},
    sellerInfo: {flex: 1, gap: 2},
    seller: {fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2},
    city: {fontSize: 11.5, fontWeight: '600'},
    priceRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    contactBtns: {flexDirection: 'row', gap: 2},
    message: {fontSize: 13, fontWeight: '500', lineHeight: 19},
    linkedRow: {flexDirection: 'row', alignItems: 'center', gap: 5},
    linkedText: {fontSize: 11.5, fontWeight: '600', flex: 1},
    actions: {flexDirection: 'row', gap: 8, marginTop: 2},
    actionBtn: {flex: 1, borderRadius: 12},
})
