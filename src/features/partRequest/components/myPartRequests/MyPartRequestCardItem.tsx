import {useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Menu, Text, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import type {PartRequest, PartRequestStatus} from '../../types'
import {PartRequestStatusBadge} from '../partRequestsList/PartRequestStatusBadge'

const CURRENCY = 'ر.س'

const T = {
    DELETE: 'حذف',
    MARK_FULFILLED: 'تم التوفير',
    MARK_OPEN: 'إعادة فتح',
    CLOSE: 'إغلاق',
}

const formatNumber = (n: number) => new Intl.NumberFormat('ar-SA', {maximumFractionDigits: 0}).format(n)

const formatBudget = (min?: number | null, max?: number | null): string => {
    if (min != null && max != null) return `${formatNumber(min)}-${formatNumber(max)} ${CURRENCY}`
    if (max != null) return `حتى ${formatNumber(max)} ${CURRENCY}`
    if (min != null) return `من ${formatNumber(min)} ${CURRENCY}`
    return 'مفتوحة'
}

interface MyPartRequestCardItemProps {
    request: PartRequest
    onPress: () => void
    onDelete: () => void
    onStatusChange: (status: PartRequestStatus) => void
}

export const MyPartRequestCardItem = ({request, onPress, onDelete, onStatusChange}: MyPartRequestCardItemProps) => {
    const theme = useAppTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => setMenuOpen(false)

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <TouchableRipple onPress={onPress} borderless rippleColor={theme.colors.scrim} style={styles.ripple}>
                <View style={styles.body}>
                    <View style={styles.topRow}>
                        <PartRequestStatusBadge status={request.status} />
                        <Menu
                            visible={menuOpen}
                            onDismiss={closeMenu}
                            contentStyle={{backgroundColor: theme.colors.surface}}
                            anchor={
                                <Pressable onPress={() => setMenuOpen(true)} hitSlop={10} style={styles.kebab}>
                                    <Icon source='dots-horizontal' size={20} color={theme.colors.onSurfaceVariant} />
                                </Pressable>
                            }>
                            {request.status === 'OPEN' && (
                                <Menu.Item
                                    leadingIcon='check-decagram-outline'
                                    onPress={() => {
                                        closeMenu()
                                        onStatusChange('FULFILLED')
                                    }}
                                    title={T.MARK_FULFILLED}
                                />
                            )}
                            {request.status === 'OPEN' && (
                                <Menu.Item
                                    leadingIcon='lock-outline'
                                    onPress={() => {
                                        closeMenu()
                                        onStatusChange('CLOSED')
                                    }}
                                    title={T.CLOSE}
                                />
                            )}
                            {request.status !== 'OPEN' && (
                                <Menu.Item
                                    leadingIcon='broadcast'
                                    onPress={() => {
                                        closeMenu()
                                        onStatusChange('OPEN')
                                    }}
                                    title={T.MARK_OPEN}
                                />
                            )}
                            <Menu.Item
                                leadingIcon='delete-outline'
                                onPress={() => {
                                    closeMenu()
                                    onDelete()
                                }}
                                title={T.DELETE}
                                titleStyle={{color: theme.colors.error}}
                            />
                        </Menu>
                    </View>

                    <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
                        {request.title}
                    </Text>

                    <View style={styles.vehicleRow}>
                        <Icon source='shield-car' size={12} color={theme.colors.success} />
                        <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                            {request.makeName} {request.modelName} {request.year}
                        </Text>
                    </View>

                    <View style={styles.bottomRow}>
                        <Text style={[styles.budget, {color: themeColors.textPrice}]} numberOfLines={1}>
                            {formatBudget(request.budgetMin, request.budgetMax)}
                        </Text>
                        {request.city ? (
                            <View style={styles.cityRow}>
                                <Icon source='map-marker-outline' size={11} color={theme.colors.onSurfaceVariant} />
                                <Text style={[styles.city, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                    {request.city}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 16, marginBottom: 10, overflow: 'hidden', ...shadows.sm, shadowColor: themeColors.shadow},
    ripple: {borderRadius: 16},
    body: {padding: 14, gap: 8},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    kebab: {padding: 2},
    title: {fontSize: 15, fontWeight: '800', lineHeight: 20, letterSpacing: -0.2},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
    vehicleText: {fontSize: 11.5, fontWeight: '500', flex: 1},
    bottomRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginTop: 4},
    budget: {fontSize: 13.5, fontWeight: '800', letterSpacing: -0.2, flexShrink: 1},
    cityRow: {flexDirection: 'row', alignItems: 'center', gap: 2},
    city: {fontSize: 11, fontWeight: '600', maxWidth: 100},
})
