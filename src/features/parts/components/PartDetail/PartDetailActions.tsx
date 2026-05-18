import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import {PriceTag} from '@/global/components'

const ARABIC_TEXT = {
    CONTACT_SELLER: 'تواصل مع البائع',
    SAVE: 'حفظ',
    OUT_OF_STOCK: 'غير متوفر',
}

interface PartDetailActionsProps {
    price: number
    inStock: boolean
    isSaved: boolean
    onContact: () => void
    onSave: () => void
}

/**
 * Sticky bottom action bar. RTL: primary CTA on leading edge (right side).
 * Price stays visible alongside the CTA — convenience for scroll-deep users.
 */
export const PartDetailActions = ({price, inStock, isSaved, onContact, onSave}: PartDetailActionsProps) => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const bottomPad = Math.max(insets.bottom, 12)

    return (
        <View
            style={[
                styles.bar,
                shadows.lg,
                {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outlineVariant,
                    paddingBottom: bottomPad,
                },
            ]}>
            <View style={styles.priceBlock}>
                <Text style={[styles.priceCaption, {color: theme.colors.onSurfaceVariant}]}>السعر الإجمالي</Text>
                <PriceTag price={price} size='lg' />
            </View>

            <TouchableOpacity
                onPress={onSave}
                style={[
                    styles.saveBtn,
                    {
                        borderColor: isSaved ? theme.colors.error : theme.colors.outline,
                        backgroundColor: theme.colors.surface,
                    },
                ]}
                activeOpacity={0.7}
                accessibilityRole='button'>
                <Icon
                    source={isSaved ? 'heart' : 'heart-outline'}
                    size={22}
                    color={isSaved ? theme.colors.error : theme.colors.onSurface}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onContact}
                disabled={!inStock}
                style={[
                    styles.primaryBtn,
                    {backgroundColor: inStock ? theme.colors.tertiary : theme.colors.surfaceContainerHigh},
                ]}
                activeOpacity={0.85}
                accessibilityRole='button'>
                <Icon
                    source={inStock ? 'whatsapp' : 'package-variant-closed-remove'}
                    size={20}
                    color={inStock ? theme.colors.onTertiary : theme.colors.onSurfaceVariant}
                />
                <Text style={[styles.primaryLabel, {color: inStock ? theme.colors.onTertiary : theme.colors.onSurfaceVariant}]}>
                    {inStock ? ARABIC_TEXT.CONTACT_SELLER : ARABIC_TEXT.OUT_OF_STOCK}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    priceBlock: {gap: 2},
    priceCaption: {fontSize: 10.5, fontWeight: '600', letterSpacing: 0.2},
    saveBtn: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.2,
    },
    primaryBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 50,
        borderRadius: 16,
    },
    primaryLabel: {fontSize: 14.5, fontWeight: '800', letterSpacing: 0.1},
})
