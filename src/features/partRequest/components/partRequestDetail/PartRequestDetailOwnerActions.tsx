import {StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequest, PartRequestStatus} from '../../types'

const T = {
    HEADING: 'إدارة طلبك',
    NOTE: 'يتواصل معك المشترون عبر واتساب والاتصال.',
    MARK_FULFILLED: 'تم توفير القطعة',
    CLOSE: 'إغلاق الطلب',
    REOPEN: 'إعادة فتح الطلب',
}

interface PartRequestDetailOwnerActionsProps {
    request: PartRequest
    busy: boolean
    onStatusChange: (status: PartRequestStatus) => void
}

/** Owner-only management panel: mark fulfilled / close / reopen the request. */
export const PartRequestDetailOwnerActions = ({request, busy, onStatusChange}: PartRequestDetailOwnerActionsProps) => {
    const theme = useAppTheme()
    const isOpen = request.status === 'OPEN'

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.headingRow}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='cog-outline' size={18} color={theme.colors.primary} />
                </View>
                <View style={styles.headingText}>
                    <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
                    <Text style={[styles.note, {color: theme.colors.onSurfaceVariant}]} numberOfLines={2}>
                        {T.NOTE}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                {isOpen ? (
                    <>
                        <Button
                            mode='contained'
                            onPress={() => onStatusChange('FULFILLED')}
                            loading={busy}
                            disabled={busy}
                            buttonColor={theme.colors.success}
                            textColor={theme.colors.onPrimary}
                            icon='check-decagram'
                            style={styles.btn}
                            contentStyle={styles.btnContent}>
                            {T.MARK_FULFILLED}
                        </Button>
                        <Button
                            mode='outlined'
                            onPress={() => onStatusChange('CLOSED')}
                            disabled={busy}
                            textColor={theme.colors.onSurfaceVariant}
                            icon='lock-outline'
                            style={styles.btn}
                            contentStyle={styles.btnContent}>
                            {T.CLOSE}
                        </Button>
                    </>
                ) : (
                    <Button
                        mode='contained'
                        onPress={() => onStatusChange('OPEN')}
                        loading={busy}
                        disabled={busy}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        icon='broadcast'
                        style={styles.btn}
                        contentStyle={styles.btnContent}>
                        {T.REOPEN}
                    </Button>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {marginHorizontal: 16, marginTop: 14, borderRadius: 18, padding: 16, ...shadows.md, shadowColor: themeColors.shadow},
    headingRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12},
    iconWrap: {width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center'},
    headingText: {flex: 1, gap: 2},
    heading: {fontSize: 15, fontWeight: '800', letterSpacing: -0.2},
    note: {fontSize: 11.5, fontWeight: '500', lineHeight: 16},
    actions: {gap: 8},
    btn: {borderRadius: 12},
    btnContent: {paddingVertical: 6},
})
