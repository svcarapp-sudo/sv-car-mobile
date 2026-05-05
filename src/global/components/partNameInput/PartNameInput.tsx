import {useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {TextInput} from 'react-native-paper'

import {usePartNameSuggestions} from '@/global/hooks'

import {PartNameSuggestionList} from './PartNameSuggestionList'

interface PartNameInputProps {
    value: string
    onChangeText: (v: string) => void
    label: string
    placeholder?: string
    categoryId?: number | null
    style?: object
}

export const PartNameInput = ({value, onChangeText, label, placeholder, categoryId, style}: PartNameInputProps) => {
    const [focused, setFocused] = useState(false)
    const {suggestions, loading} = usePartNameSuggestions({
        query: value,
        categoryId,
        enabled: focused,
    })

    const handleSelect = (text: string) => {
        onChangeText(text)
        setFocused(false)
        Keyboard.dismiss()
    }

    const showList = focused && (loading || suggestions.length > 0)

    return (
        <View style={style}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                mode='outlined'
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                left={<TextInput.Icon icon='tag-outline' />}
                style={styles.input}
            />
            {showList && <PartNameSuggestionList suggestions={suggestions} loading={loading} onSelect={handleSelect} />}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 0},
})
