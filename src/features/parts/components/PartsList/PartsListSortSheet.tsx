import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Modal, Portal, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    TITLE: 'ترتيب النتائج',
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name'

export const SORT_LABELS: Record<SortOption, string> = {
    newest: 'الأحدث',
    price_asc: 'السعر: من الأقل',
    price_desc: 'السعر: من الأعلى',
    name: 'الاسم',
}

const OPTIONS: {value: SortOption; icon: string}[] = [
    {value: 'newest', icon: 'clock-fast'},
    {value: 'price_asc', icon: 'sort-numeric-ascending'},
    {value: 'price_desc', icon: 'sort-numeric-descending'},
    {value: 'name', icon: 'sort-alphabetical-ascending'},
]

interface PartsListSortSheetProps {
    visible: boolean
    selected: SortOption
    onSelect: (value: SortOption) => void
    onDismiss: () => void
}

export const PartsListSortSheet = ({visible, selected, onSelect, onDismiss}: PartsListSortSheetProps) => {
    const theme = useAppTheme()

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    styles.sheet,
                    {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                ]}>
                <View style={[styles.handle, {backgroundColor: theme.colors.outlineVariant}]} />
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>

                <View style={styles.options}>
                    {OPTIONS.map(opt => {
                        const active = opt.value === selected
                        return (
                            <Pressable
                                key={opt.value}
                                onPress={() => {
                                    onSelect(opt.value)
                                    onDismiss()
                                }}
                                style={({pressed}) => [
                                    styles.row,
                                    {
                                        backgroundColor: active ? theme.colors.accentSubtle : theme.colors.surfaceContainerLow,
                                        borderColor: active ? theme.colors.tertiary : theme.colors.outlineVariant,
                                    },
                                    pressed && styles.rowPressed,
                                ]}>
                                <Icon
                                    source={opt.icon}
                                    size={18}
                                    color={active ? theme.colors.tertiary : theme.colors.onSurfaceVariant}
                                />
                                <Text
                                    style={[
                                        styles.optionText,
                                        {color: active ? theme.colors.onSurface : theme.colors.onSurfaceVariant},
                                    ]}>
                                    {SORT_LABELS[opt.value]}
                                </Text>
                                {active && <Icon source='check-circle' size={18} color={theme.colors.tertiary} />}
                            </Pressable>
                        )
                    })}
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    sheet: {
        marginHorizontal: 16,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        gap: 16,
    },
    handle: {width: 40, height: 4, borderRadius: 2, alignSelf: 'center'},
    title: {fontSize: 16, fontWeight: '800', textAlign: 'center', letterSpacing: -0.2},
    options: {gap: 8},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
    },
    rowPressed: {opacity: 0.85},
    optionText: {flex: 1, fontSize: 14, fontWeight: '600', letterSpacing: -0.1},
})
