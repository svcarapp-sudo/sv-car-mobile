import {Pressable, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {PartNameSuggestion} from '@/global/services/partNameService'

const ARABIC = {EMPTY: 'لا توجد اقتراحات', LOADING: 'جاري البحث...'}

interface PartNameSuggestionListProps {
    suggestions: PartNameSuggestion[]
    loading: boolean
    onSelect: (nameAr: string) => void
}

export const PartNameSuggestionList = ({suggestions, loading, onSelect}: PartNameSuggestionListProps) => {
    const theme = useAppTheme()

    if (loading && suggestions.length === 0) {
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
                <View style={styles.loadingRow}>
                    <ActivityIndicator size={14} color={theme.colors.primary} />
                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                        {ARABIC.LOADING}
                    </Text>
                </View>
            </View>
        )
    }

    if (suggestions.length === 0) return null

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            {suggestions.map((s, idx) => (
                <Pressable
                    key={s.id}
                    onPress={() => onSelect(s.nameAr)}
                    style={({pressed}) => [
                        styles.row,
                        idx < suggestions.length - 1 && {borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant},
                        pressed && {backgroundColor: theme.colors.surfaceVariant},
                    ]}>
                    <Icon source='tag-outline' size={16} color={theme.colors.primary} />
                    <View style={styles.textCol}>
                        <Text variant='bodyMedium' style={{color: theme.colors.onSurface, fontWeight: '600'}}>
                            {s.nameAr}
                        </Text>
                        {s.nameEn && (
                            <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                                {s.nameEn}
                            </Text>
                        )}
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        borderRadius: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    loadingRow: {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12},
    row: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 10},
    textCol: {flex: 1, gap: 2},
})
