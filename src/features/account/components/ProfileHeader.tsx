import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Avatar, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Plan} from '@/global/types'

interface ProfileHeaderProps {
    name: string
    email: string
    plan: Plan | null
}

export const ProfileHeader = ({name, email, plan}: ProfileHeaderProps) => {
    const theme = useAppTheme()
    const initials = name?.slice(0, 2).toUpperCase() || 'SV'

    return (
        <View style={[styles.header, {backgroundColor: theme.colors.elevation.level1}]}>
            <Avatar.Text
                size={80}
                label={initials}
                style={{backgroundColor: theme.colors.primary}}
                labelStyle={{fontSize: 28, fontWeight: '700'}}
            />
            <Text variant='headlineSmall' style={[styles.name, {color: theme.colors.onSurface}]}>
                {name}
            </Text>
            <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant}}>
                {email}
            </Text>
            {plan && (
                <View style={[styles.planBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='crown-outline' size={14} color={theme.colors.primary} />
                    <Text variant='labelSmall' style={[styles.planBadgeText, {color: theme.colors.primary}]}>
                        {plan.name}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
    },
    name: {
        marginTop: 16,
        fontWeight: '700',
    },
    planBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
        gap: 4,
    },
    planBadgeText: {
        fontWeight: '600',
    },
})
