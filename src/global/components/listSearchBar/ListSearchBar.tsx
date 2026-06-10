import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    CLEAR: 'مسح البحث',
}

export interface ListSearchBarProps {
    value: string
    onChangeText: (text: string) => void
    placeholder: string
    autoFocus?: boolean
}

/**
 * Inline search field for long selection lists (makes, models, categories).
 * Filters as the user types — the pattern every large-catalog marketplace uses
 * so picking from 50+ options never means scrolling.
 */
export const ListSearchBar = ({value, onChangeText, placeholder, autoFocus = false}: ListSearchBarProps) => {
    return (
        <View style={styles.container}>
            <Icon source='magnify' size={20} color={themeColors.onSurfaceVariant} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={themeColors.onSurfaceVariant}
                autoFocus={autoFocus}
                autoCorrect={false}
                returnKeyType='search'
                accessibilityRole='search'
                accessibilityLabel={placeholder}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    onPress={() => onChangeText('')}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    accessibilityRole='button'
                    accessibilityLabel={ARABIC_TEXT.CLEAR}>
                    <Icon source='close-circle' size={18} color={themeColors.onSurfaceVariant} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: themeColors.surface,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 46,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: themeColors.onSurface,
        paddingVertical: 0,
    },
})
