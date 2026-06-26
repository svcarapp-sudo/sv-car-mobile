import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {SellerAnalytics} from '../../types'
import {AnalyticsTile} from './AnalyticsTile'

const ARABIC = {TITLE: 'العروض', SENT: 'مُرسلة', PENDING: 'قيد الانتظار', ACCEPTED: 'مقبولة'}

interface OffersFunnelRowProps {
    analytics: SellerAnalytics
}

/** Offers funnel: sent → pending → accepted, with chevrons between the stages. */
export const OffersFunnelRow = ({analytics}: OffersFunnelRowProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrap}>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC.TITLE}
            </Text>
            <View style={styles.row}>
                <AnalyticsTile icon='send-outline' value={analytics.offersSent} caption={ARABIC.SENT} accent='primary' />
                <Icon source='chevron-back' size={18} color={theme.colors.onSurfaceVariant} />
                <AnalyticsTile icon='clock-outline' value={analytics.offersPending} caption={ARABIC.PENDING} accent='tertiary' />
                <Icon source='chevron-back' size={18} color={theme.colors.onSurfaceVariant} />
                <AnalyticsTile
                    icon='handshake-outline'
                    value={analytics.offersAccepted}
                    caption={ARABIC.ACCEPTED}
                    accent='success'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {gap: 12},
    title: {fontWeight: '700'},
    row: {flexDirection: 'row', alignItems: 'center', gap: 4},
})
