import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface MyPartsSearchBarProps {
    value: string
    onChange: (v: string) => void
    placeholder?: string
}

const ARABIC_TEXT = {
    PLACEHOLDER: 'ابحث في قطعك...',
}

export const MyPartsSearchBar = ({value, onChange, placeholder}: MyPartsSearchBarProps) => {
    const theme = useAppTheme()
    const hasValue = value.length > 0
    return (
        <View
            style={[
                styles.bar,
                {
                    backgroundColor: theme.colors.surface,
                    borderColor: hasValue ? theme.colors.primary : theme.colors.outlineVariant,
                },
            ]}>
            <Icon source='magnify' size={18} color={hasValue ? theme.colors.primary : theme.colors.onSurfaceVariant} />
            <TextInput
                style={[styles.input, {color: theme.colors.onSurface}]}
                placeholder={placeholder ?? ARABIC_TEXT.PLACEHOLDER}
                placeholderTextColor={theme.colors.outline}
                value={value}
                onChangeText={onChange}
                autoCorrect={false}
                returnKeyType='search'
            />
            {hasValue && (
                <TouchableOpacity onPress={() => onChange('')} hitSlop={10} accessibilityRole='button' accessibilityLabel='Clear'>
                    <Icon source='close-circle' size={18} color={theme.colors.onSurfaceVariant} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        fontSize: 14,
        padding: 0,
        textAlign: 'right',
    },
})
