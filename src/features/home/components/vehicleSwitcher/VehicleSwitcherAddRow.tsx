import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    ADD: 'إضافة مركبة جديدة',
    SUBTITLE: 'حتى ٤ مركبات لحساب واحد',
    CAP_HEADLINE: 'وصلت إلى الحد الأقصى',
    CAP_HINT: 'احذف مركبة لإضافة أخرى',
}

interface VehicleSwitcherAddRowProps {
    capReached: boolean
    onPress: () => void
}

export const VehicleSwitcherAddRow = ({capReached, onPress}: VehicleSwitcherAddRowProps) => {
    if (capReached) {
        return (
            <View style={[styles.row, styles.disabled]}>
                <View style={[styles.iconBox, styles.iconBoxDisabled]}>
                    <Icon source='alert-circle-outline' size={20} color={themeColors.onSurfaceVariant} />
                </View>
                <View style={styles.info}>
                    <Text style={[styles.title, styles.titleDisabled]}>{ARABIC_TEXT.CAP_HEADLINE}</Text>
                    <Text style={styles.subtitle}>{ARABIC_TEXT.CAP_HINT}</Text>
                </View>
            </View>
        )
    }

    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.row, pressed && styles.pressed]}
            accessibilityRole='button'
            accessibilityLabel={ARABIC_TEXT.ADD}>
            <View style={styles.iconBox}>
                <Icon source='plus' size={22} color={themeColors.onTertiary} />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{ARABIC_TEXT.ADD}</Text>
                <Text style={styles.subtitle}>{ARABIC_TEXT.SUBTITLE}</Text>
            </View>
            <Icon source='chevron-left' size={20} color={themeColors.tertiary} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: themeColors.accentBorder,
        backgroundColor: themeColors.accentSubtle,
        marginBottom: 4,
    },
    pressed: {opacity: 0.78, transform: [{scale: 0.99}]},
    disabled: {
        backgroundColor: themeColors.surfaceContainerLow,
        borderColor: themeColors.outlineVariant,
        borderStyle: 'solid',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: themeColors.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBoxDisabled: {backgroundColor: themeColors.surface},
    info: {flex: 1},
    title: {fontSize: 14, fontWeight: '700', color: themeColors.tertiary, letterSpacing: -0.1},
    titleDisabled: {color: themeColors.onSurface},
    subtitle: {fontSize: 11.5, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 2},
})
