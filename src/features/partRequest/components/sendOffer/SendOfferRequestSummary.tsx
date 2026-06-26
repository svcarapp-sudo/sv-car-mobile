import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequest} from '../../types'

const CONDITION_LABEL: Record<PartRequest['conditionPreference'], string> = {
    NEW: 'جديد',
    USED: 'مستعمل',
    ANY: 'أي حالة',
}

const formatVehicle = (request: PartRequest) => `${request.makeName || ''} ${request.modelName || ''} ${request.year}`.trim()

interface SendOfferRequestSummaryProps {
    request: PartRequest
}

/** Compact reminder of which request the seller is quoting on. */
export const SendOfferRequestSummary = ({request}: SendOfferRequestSummaryProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                <Icon source='clipboard-list-outline' size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.info}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {request.title}
                </Text>
                <View style={styles.metaRow}>
                    <Icon source='car-side' size={13} color={theme.colors.secondary} />
                    <Text style={[styles.meta, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {formatVehicle(request)}
                    </Text>
                </View>
                <View style={[styles.chip, {backgroundColor: theme.colors.accentSoft}]}>
                    <Text style={[styles.chipText, {color: theme.colors.tertiary}]}>
                        {CONDITION_LABEL[request.conditionPreference]}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 12,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 18,
        padding: 14,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    iconWrap: {width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'},
    info: {flex: 1, gap: 6},
    title: {fontSize: 15, fontWeight: '800', lineHeight: 21, letterSpacing: -0.2},
    metaRow: {flexDirection: 'row', alignItems: 'center', gap: 5},
    meta: {fontSize: 12, fontWeight: '600', flex: 1},
    chip: {alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999},
    chipText: {fontSize: 10.5, fontWeight: '800', letterSpacing: 0.1},
})
