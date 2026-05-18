import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

interface PartsSearchBarProps {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    autoFocus?: boolean
    elevated?: boolean
    onClear?: () => void
}

/**
 * Pill-shaped search bar that appears on Categories + List screens.
 * Inspired by Noon/Airbnb 2025 redesign — search-first, ever-present.
 */
export const PartsSearchBar = ({value, onChangeText, placeholder, autoFocus, elevated, onClear}: PartsSearchBarProps) => {
    const theme = useAppTheme()

    const handleClear = () => {
        onChangeText('')
        onClear?.()
    }

    return (
        <View
            style={[
                styles.bar,
                elevated && shadows.sm,
                {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.outlineVariant,
                },
            ]}>
            <View style={[styles.iconBox, {backgroundColor: theme.colors.accentSubtle}]}>
                <Icon source='magnify' size={18} color={theme.colors.tertiary} />
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                autoFocus={autoFocus}
                autoCorrect={false}
                style={[styles.input, {color: theme.colors.onSurface}]}
                returnKeyType='search'
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear} hitSlop={8} accessibilityRole='button'>
                    <Icon source='close-circle' size={18} color={theme.colors.outline} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        paddingStart: 6,
        paddingEnd: 14,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 14,
        padding: 0,
        textAlign: 'right',
        fontWeight: '500',
    },
})
