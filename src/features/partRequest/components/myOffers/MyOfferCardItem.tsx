import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {PressableScale, PriceTag} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import type {Offer} from '@/global/types'

import {OfferStatusBadge} from '../OfferStatusBadge'

const T = {
    WITHDRAW: 'سحب العرض',
    UNTITLED: 'طلب قطعة',
    YOUR_PRICE: 'سعرك',
}

interface MyOfferCardItemProps {
    offer: Offer
    withdrawing: boolean
    onPress: () => void
    onWithdraw: () => void
}

/** A seller's sent offer: request title, quoted price, status + withdraw action. */
export const MyOfferCardItem = ({offer, withdrawing, onPress, onWithdraw}: MyOfferCardItemProps) => {
    const theme = useAppTheme()

    return (
        <PressableScale
            onPress={onPress}
            containerStyle={styles.container}
            style={[styles.card, {backgroundColor: theme.colors.surface}]}
            accessibilityRole='button'
            accessibilityLabel={offer.requestTitle ?? T.UNTITLED}>
            <View style={styles.topRow}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {offer.requestTitle ?? T.UNTITLED}
                </Text>
                <OfferStatusBadge status={offer.status} />
            </View>

            <View style={styles.priceRow}>
                <Text style={[styles.priceLabel, {color: theme.colors.onSurfaceVariant}]}>{T.YOUR_PRICE}</Text>
                <PriceTag price={offer.price} size='md' />
            </View>

            {offer.linkedPartName ? (
                <View style={styles.linkedRow}>
                    <Icon source='link-variant' size={13} color={theme.colors.tertiary} />
                    <Text style={[styles.linkedText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {offer.linkedPartName}
                    </Text>
                </View>
            ) : null}

            {offer.status === 'PENDING' && (
                <Button
                    mode='outlined'
                    onPress={onWithdraw}
                    loading={withdrawing}
                    disabled={withdrawing}
                    textColor={theme.colors.error}
                    icon='undo-variant'
                    style={[styles.withdraw, {borderColor: theme.colors.error}]}
                    contentStyle={styles.withdrawContent}>
                    {T.WITHDRAW}
                </Button>
            )}
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    container: {marginHorizontal: 12, marginBottom: 12},
    card: {borderRadius: 18, padding: 14, gap: 10, ...shadows.md, shadowColor: themeColors.shadow},
    topRow: {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10},
    title: {flex: 1, fontSize: 14.5, fontWeight: '800', lineHeight: 20, letterSpacing: -0.2},
    priceRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    priceLabel: {fontSize: 12, fontWeight: '700'},
    linkedRow: {flexDirection: 'row', alignItems: 'center', gap: 5},
    linkedText: {fontSize: 11.5, fontWeight: '600', flex: 1},
    withdraw: {borderRadius: 12, marginTop: 2},
    withdrawContent: {paddingVertical: 4},
})
