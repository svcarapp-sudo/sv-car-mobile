import {TextInput, type TextInputProps} from 'react-native-paper'

import {toAsciiDigits} from '@/global/utils'

type NumericTextInputProps = Omit<TextInputProps, 'onChangeText'> & {
    value: string
    onChangeText: (asciiValue: string) => void
}

/**
 * TextInput for numeric fields. Converts Arabic-Indic and Persian digits to ASCII
 * on every keystroke before they're stored, so the field always displays English
 * digits and downstream `parseFloat` / libphonenumber work regardless of which
 * keyboard the user has active.
 */
export const NumericTextInput = ({onChangeText, keyboardType = 'decimal-pad', ...rest}: NumericTextInputProps) => (
    <TextInput {...rest} keyboardType={keyboardType} onChangeText={text => onChangeText(toAsciiDigits(text))} />
)
