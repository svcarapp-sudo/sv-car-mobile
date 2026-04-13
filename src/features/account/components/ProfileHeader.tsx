import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Avatar, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
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
        <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
            <Avatar.Text
                size={60}
                label={initials}
                style={{backgroundColor: theme.colors.tertiary}}
                labelStyle={[styles.avatarLabel, {color: theme.colors.onTertiary}]}
            />
            <View style={styles.textColumn}>
                <Text variant='titleMedium' style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {name}
                </Text>
                <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}} numberOfLines={1}>
                    {email}
                </Text>
                {plan && (
                    <View style={[styles.planBadge, {backgroundColor: theme.colors.tertiaryContainer}]}>
                        <Icon source='crown-outline' size={12} color={themeColors.onTertiaryContainer} />
                        <Text variant='labelSmall' style={[styles.planBadgeText, {color: themeColors.onTertiaryContainer}]}>
                            {plan.name}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 6,
    },
    avatarLabel: {fontSize: 22, fontWeight: '700'},
    textColumn: {flex: 1, gap: 2},
    name: {fontWeight: '700'},
    planBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 6,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
        gap: 4,
    },
    planBadgeText: {fontWeight: '700'},
})
