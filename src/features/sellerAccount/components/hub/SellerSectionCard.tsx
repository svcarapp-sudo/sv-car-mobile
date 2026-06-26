import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

interface Props {
    icon: string
    title: string
    subtitle?: string
    onPress: () => void
}

/** A tappable navigation card used in the seller hub (e.g. open the analytics screen). */
export const SellerSectionCard = ({icon, title, subtitle, onPress}: Props) => {
    const theme = useAppTheme()
    return (
        <PressableScale
            withHaptic
            onPress={onPress}
            containerStyle={styles.wrap}
            style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={[styles.iconChip, {backgroundColor: theme.colors.accentContainer}]}>
                <Icon source={icon} size={22} color={theme.colors.tertiary} />
            </View>
            <View style={styles.body}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {title}
                </Text>
                {!!subtitle && (
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <Icon source='chevron-left' size={24} color={theme.colors.onSurfaceVariant} />
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    wrap: {borderRadius: 16},
    card: {flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, borderWidth: 1},
    iconChip: {width: 44, height: 44, borderRadius: 13, justifyContent: 'center', alignItems: 'center'},
    body: {flex: 1, gap: 2},
    title: {fontSize: 14, fontWeight: '800'},
    subtitle: {fontSize: 12, fontWeight: '600'},
})
