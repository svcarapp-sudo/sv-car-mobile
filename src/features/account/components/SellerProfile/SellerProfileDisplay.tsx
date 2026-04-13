import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Chip, Divider, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {SellerProfile} from '@/global/types'

const ARABIC = {
    SELLER_PROFILE: 'الملف التجاري',
    EDIT: 'تعديل',
    PHONE: 'رقم الهاتف',
    CITY: 'المدينة',
    DESCRIPTION: 'الوصف',
    WORKING_HOURS: 'ساعات العمل',
}

interface SellerProfileDisplayProps {
    sellerProfile: SellerProfile
    onEditPress: () => void
}

export const SellerProfileDisplay = ({sellerProfile, onEditPress}: SellerProfileDisplayProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface, marginBottom: 0}]}>
                    {ARABIC.SELLER_PROFILE}
                </Text>
                <Button mode='text' onPress={onEditPress} compact icon='pencil-outline'>
                    {ARABIC.EDIT}
                </Button>
            </View>

            <View style={[styles.profileCard, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.profileHeader}>
                    <View style={{flex: 1}}>
                        <Text variant='titleMedium' style={[styles.profileName, {color: theme.colors.onSurface}]}>
                            {sellerProfile.storeName || sellerProfile.userName}
                        </Text>
                    </View>
                    <Chip
                        icon='tag-outline'
                        compact
                        textStyle={styles.chipText}
                        style={{backgroundColor: theme.colors.primaryContainer}}>
                        {sellerProfile.sellerType.name}
                    </Chip>
                </View>

                <Divider />

                <View style={styles.infoSection}>
                    <InfoRow icon='phone-outline' label={ARABIC.PHONE} value={sellerProfile.phone} theme={theme} />
                    {sellerProfile.city && (
                        <InfoRow icon='map-marker-outline' label={ARABIC.CITY} value={sellerProfile.city} theme={theme} />
                    )}
                    {sellerProfile.workingHours && (
                        <InfoRow
                            icon='clock-outline'
                            label={ARABIC.WORKING_HOURS}
                            value={sellerProfile.workingHours}
                            theme={theme}
                        />
                    )}
                    {sellerProfile.description && (
                        <InfoRow
                            icon='text-box-outline'
                            label={ARABIC.DESCRIPTION}
                            value={sellerProfile.description}
                            theme={theme}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

interface InfoRowProps {
    icon: string
    label: string
    value: string
    theme: ReturnType<typeof useAppTheme>
}

const InfoRow = ({icon, label, value, theme}: InfoRowProps) => (
    <View style={styles.infoRow}>
        <Icon source={icon} size={18} color={theme.colors.onSurfaceVariant} />
        <View style={styles.infoContent}>
            <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                {label}
            </Text>
            <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>
                {value}
            </Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    profileCard: {
        borderRadius: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
    profileHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, gap: 12},
    profileName: {fontWeight: '700'},
    chipText: {fontSize: 12, fontWeight: '600'},
    infoSection: {padding: 16, gap: 14},
    infoRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 12},
    infoContent: {flex: 1, gap: 2},
})
