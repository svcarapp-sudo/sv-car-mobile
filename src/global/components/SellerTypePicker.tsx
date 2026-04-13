import React from 'react'
import {Platform, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {SellerType} from '@/global/types'

interface SellerTypePickerProps {
    types: SellerType[]
    selectedId: number | null
    onSelect: (id: number) => void
    label?: string
}

/** Field visibility config per seller type slug */
export interface SellerTypeFieldConfig {
    showStoreName: boolean
    storeNameLabel: string
    showWorkingHours: boolean
    showCity: boolean
    showDescription: boolean
}

const FIELD_CONFIGS: Record<string, SellerTypeFieldConfig> = {
    store: {
        showStoreName: true,
        storeNameLabel: 'اسم المتجر',
        showWorkingHours: true,
        showCity: true,
        showDescription: true,
    },
    individual: {
        showStoreName: false,
        storeNameLabel: '',
        showWorkingHours: false,
        showCity: true,
        showDescription: true,
    },
    casual: {
        showStoreName: false,
        storeNameLabel: '',
        showWorkingHours: false,
        showCity: true,
        showDescription: false,
    },
}

const DEFAULT_CONFIG: SellerTypeFieldConfig = {
    showStoreName: true,
    storeNameLabel: 'اسم المتجر',
    showWorkingHours: true,
    showCity: true,
    showDescription: true,
}

export function getSellerTypeFieldConfig(slug: string | undefined): SellerTypeFieldConfig {
    if (!slug) return DEFAULT_CONFIG
    return FIELD_CONFIGS[slug] ?? DEFAULT_CONFIG
}

const SLUG_ICONS: Record<string, string> = {
    store: 'store-outline',
    individual: 'account-outline',
    casual: 'hand-wave-outline',
}

function getIcon(slug: string): string {
    return SLUG_ICONS[slug] ?? 'tag-outline'
}

export const SellerTypePicker = ({types, selectedId, onSelect, label}: SellerTypePickerProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            {label && (
                <Text variant='labelLarge' style={[styles.label, {color: theme.colors.onSurface}]}>
                    {label}
                </Text>
            )}
            <View style={styles.grid}>
                {types.map(t => {
                    const isSelected = t.id === selectedId
                    return (
                        <Pressable
                            key={t.id}
                            onPress={() => onSelect(t.id)}
                            style={({pressed}) => [
                                styles.card,
                                {
                                    backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
                                    borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                                    opacity: pressed ? 0.7 : 1,
                                    ...(!isSelected && styles.cardShadow),
                                },
                            ]}>
                            {/* Radio indicator — always visible */}
                            <View
                                style={[
                                    styles.radio,
                                    {
                                        borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                                        backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                                    },
                                ]}>
                                {isSelected && <Icon source='check' size={12} color={theme.colors.onPrimary} />}
                            </View>

                            <View style={[styles.iconWrap, {backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceVariant}]}>
                                <Icon source={getIcon(t.slug)} size={24} color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant} />
                            </View>
                            <Text
                                variant='titleSmall'
                                style={[styles.name, {color: isSelected ? theme.colors.primary : theme.colors.onSurface}]}
                                numberOfLines={1}>
                                {t.name}
                            </Text>
                            {t.description && (
                                <Text
                                    variant='bodySmall'
                                    style={[styles.desc, {color: theme.colors.onSurfaceVariant}]}
                                    numberOfLines={2}>
                                    {t.description}
                                </Text>
                            )}
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {marginBottom: 16},
    label: {fontWeight: '600', marginBottom: 10},
    grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
    card: {
        flex: 1,
        minWidth: '45%',
        borderRadius: 14,
        borderWidth: 2,
        padding: 14,
        paddingTop: 18,
        alignItems: 'center',
        gap: 8,
        position: 'relative',
    },
    cardShadow: Platform.select({
        ios: {shadowColor: themeColors.shadow, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.08, shadowRadius: 4},
        android: {elevation: 2},
    }) as object,
    radio: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {fontWeight: '700', textAlign: 'center'},
    desc: {textAlign: 'center', lineHeight: 18},
})
