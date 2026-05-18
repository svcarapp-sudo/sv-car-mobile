import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Part, PartCategoryApi} from '@/global/types'

const ARABIC_TEXT = {
    TITLE: 'المواصفات',
    BRAND: 'الشركة المصنّعة',
    SKU: 'رمز القطعة',
    CATEGORY: 'الفئة',
    STOCK: 'الحالة',
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
}

interface SpecRow {
    label: string
    value: string
    icon: string
}

interface PartDetailSpecsProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
}

export const PartDetailSpecs = ({part, categoryInfo}: PartDetailSpecsProps) => {
    const theme = useAppTheme()

    const rows: SpecRow[] = []
    if (part.brand) rows.push({label: ARABIC_TEXT.BRAND, value: part.brand, icon: 'factory'})
    if (part.sku) rows.push({label: ARABIC_TEXT.SKU, value: part.sku, icon: 'barcode'})
    if (categoryInfo) rows.push({label: ARABIC_TEXT.CATEGORY, value: categoryInfo.name, icon: categoryInfo.icon || 'tag'})
    rows.push({
        label: ARABIC_TEXT.STOCK,
        value: part.inStock ? ARABIC_TEXT.IN_STOCK : ARABIC_TEXT.OUT_OF_STOCK,
        icon: part.inStock ? 'package-variant-closed-check' : 'package-variant-closed-remove',
    })

    if (rows.length === 0) return null

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
            <View style={styles.grid}>
                {rows.map(row => (
                    <View
                        key={row.label}
                        style={[
                            styles.row,
                            {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outlineVariant},
                        ]}>
                        <View style={[styles.rowIcon, {backgroundColor: theme.colors.accentSubtle}]}>
                            <Icon source={row.icon} size={14} color={theme.colors.tertiary} />
                        </View>
                        <View style={styles.rowText}>
                            <Text style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>{row.label}</Text>
                            <Text style={[styles.value, {color: theme.colors.onSurface}]} numberOfLines={1}>
                                {row.value}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 22, padding: 18, borderWidth: 1, gap: 14},
    title: {fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2},
    grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexBasis: '48%',
        flexGrow: 1,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    rowIcon: {
        width: 30,
        height: 30,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowText: {flex: 1, gap: 1, minWidth: 0},
    label: {fontSize: 10.5, fontWeight: '600', letterSpacing: 0.2},
    value: {fontSize: 13, fontWeight: '700', letterSpacing: -0.1},
})
