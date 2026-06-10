import {Pressable, ScrollView, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {PartCategoryApi} from '@/global/types'

const T = {
    HEADING: 'فئة القطعة',
    EMPTY: 'لا توجد فئات متاحة',
}

interface AddPartRequestCategoryStripProps {
    categories: PartCategoryApi[]
    selectedId: number | null
    onSelect: (id: number) => void
}

export const AddPartRequestCategoryStrip = ({categories, selectedId, onSelect}: AddPartRequestCategoryStripProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
            {categories.length === 0 ? (
                <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{T.EMPTY}</Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                    {categories.map(cat => {
                        const active = selectedId === cat.id
                        return (
                            <Pressable
                                key={cat.id}
                                onPress={() => onSelect(cat.id)}
                                style={({pressed}) => [
                                    styles.chip,
                                    {
                                        backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                                        borderColor: active ? theme.colors.primary : theme.colors.outlineVariant,
                                    },
                                    pressed && styles.chipPressed,
                                ]}>
                                <Icon
                                    source={cat.icon || 'shape-outline'}
                                    size={15}
                                    color={active ? theme.colors.tertiary : theme.colors.onSurfaceVariant}
                                />
                                <Text
                                    style={[styles.chipLabel, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]}
                                    numberOfLines={1}>
                                    {cat.name}
                                </Text>
                            </Pressable>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {gap: 8},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    empty: {fontSize: 13, fontStyle: 'italic'},
    chips: {flexDirection: 'row', gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 999,
        borderWidth: 1.2,
        minHeight: 38,
    },
    chipPressed: {opacity: 0.75},
    chipLabel: {fontSize: 13, fontWeight: '700', letterSpacing: 0.1},
})
