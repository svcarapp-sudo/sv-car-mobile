import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC = {REQ: 'مطلوب', OPT: 'اختياري'}

interface AddPartFieldCardProps {
    title: string
    required?: boolean
    children: React.ReactNode
}

export const AddPartFieldCard = ({title, required, children}: AddPartFieldCardProps) => {
    const theme = useAppTheme()
    const bg = required ? theme.colors.errorContainer : theme.colors.surfaceVariant
    const fg = required ? theme.colors.error : theme.colors.onSurfaceVariant
    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.header}>
                <Text variant='titleSmall' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {title}
                </Text>
                <View style={[styles.badge, {backgroundColor: bg}]}>
                    {required && <Icon source='asterisk' size={9} color={fg} />}
                    <Text variant='labelSmall' style={[styles.badgeText, {color: fg}]}>
                        {required ? ARABIC.REQ : ARABIC.OPT}
                    </Text>
                </View>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12},
    title: {fontWeight: '700'},
    badge: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10},
    badgeText: {fontWeight: '700'},
})
