import {useState, useCallback, useMemo} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {TextInput} from 'react-native-paper'
import {getCountries, getCountryCallingCode, isValidPhoneNumber} from 'libphonenumber-js'
import type {CountryCode} from 'libphonenumber-js'
import {getLocales} from 'expo-localization'

import {CountryCodePicker} from './CountryCodePicker'

const toFlag = (code: string): string =>
    String.fromCodePoint(0x1f1e6 - 65 + code.charCodeAt(0), 0x1f1e6 - 65 + code.charCodeAt(1))

const AR: Record<string, string> = {
    SA: 'السعودية', AE: 'الإمارات', KW: 'الكويت', BH: 'البحرين',
    QA: 'قطر', OM: 'عُمان', YE: 'اليمن', IQ: 'العراق',
    JO: 'الأردن', LB: 'لبنان', SY: 'سوريا', PS: 'فلسطين',
    EG: 'مصر', SD: 'السودان', LY: 'ليبيا', TN: 'تونس',
    DZ: 'الجزائر', MA: 'المغرب', TR: 'تركيا', US: 'أمريكا',
    GB: 'بريطانيا', FR: 'فرنسا', DE: 'ألمانيا', IN: 'الهند',
    PK: 'باكستان', CN: 'الصين', JP: 'اليابان', RU: 'روسيا',
    CA: 'كندا', AU: 'أستراليا', BR: 'البرازيل',
}

interface Country {
    code: CountryCode
    dial: string
    flag: string
    label: string
}

const PRIORITY: CountryCode[] = ['SA', 'AE', 'KW', 'BH', 'QA', 'OM', 'YE', 'IQ', 'JO', 'LB', 'SY', 'PS', 'EG']

let _list: Country[] | null = null
const list = (): Country[] => {
    if (_list) return _list
    const all = getCountries().map(c => ({
        code: c, dial: '+' + getCountryCallingCode(c), flag: toFlag(c), label: AR[c] ?? c,
    }))
    const pSet = new Set<string>(PRIORITY)
    const top = PRIORITY.map(c => all.find(i => i.code === c)!).filter(Boolean)
    const rest = all.filter(i => !pSet.has(i.code)).sort((a, b) => a.label.localeCompare(b.label, 'ar'))
    _list = [...top, ...rest]
    return _list
}

const detect = (): CountryCode => {
    try {
        const r = getLocales()?.[0]?.regionCode?.toUpperCase()
        if (r) { try { getCountryCallingCode(r as CountryCode); return r as CountryCode } catch {} }
    } catch {}
    return 'SA'
}

export interface PhoneInputValue {
    nationalNumber: string
    fullNumber: string
    dialCode: string
    countryCode: string
    isValid: boolean
}

export interface PhoneInputProps {
    onChange: (v: PhoneInputValue) => void
    initialValue?: string
    defaultCountry?: string
    disabled?: boolean
}

export const PhoneInput = ({onChange, initialValue = '', defaultCountry, disabled}: PhoneInputProps) => {
    const countries = useMemo(list, [])

    const initCountry = useMemo(() => {
        const c = defaultCountry?.toUpperCase() ?? detect()
        return countries.find(x => x.code === c) ?? countries[0]
    }, [defaultCountry, countries])

    const [digits, setDigits] = useState(() => initialValue.replace(/[^\d]/g, ''))
    const [country, setCountry] = useState<Country>(initCountry)
    const [pickerOpen, setPickerOpen] = useState(false)

    const notify = useCallback((nat: string, c: Country) => {
        const full = c.dial + nat.replace(/[^\d]/g, '')
        let valid = false
        if (nat.trim()) { try { valid = isValidPhoneNumber(full) } catch {} }
        onChange({nationalNumber: nat, fullNumber: full, dialCode: c.dial, countryCode: c.code, isValid: valid})
    }, [onChange])

    const onType = useCallback((text: string) => {
        const d = text.replace(/[^\d]/g, '')
        setDigits(d)
        notify(d, country)
    }, [country, notify])

    const pickCountry = useCallback((c: Country) => {
        setCountry(c)
        setPickerOpen(false)
        notify(digits, c)
    }, [digits, notify])

    return (
        <View style={styles.container}>
            <Pressable onPress={() => !disabled && setPickerOpen(true)} style={styles.countryPressable}>
                <View pointerEvents='none'>
                    <TextInput
                        value={`${country.flag}  ${country.dial}`}
                        mode='outlined'
                        editable={false}
                        right={<TextInput.Icon icon='chevron-down' size={16} />}
                        style={styles.countryInput}
                        contentStyle={styles.countryContent}
                    />
                </View>
            </Pressable>

            <View style={styles.numberWrap}>
                <TextInput
                    value={digits}
                    onChangeText={onType}
                    mode='outlined'
                    keyboardType='phone-pad'
                    disabled={disabled}
                    placeholder='5XXXXXXXX'
                    style={styles.numberInput}
                    contentStyle={styles.numberContent}
                />
            </View>

            <CountryCodePicker
                visible={pickerOpen}
                selectedCode={country.code}
                countries={countries}
                onSelect={pickCountry}
                onDismiss={() => setPickerOpen(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', gap: 8},
    countryPressable: {width: 120},
    countryInput: {},
    countryContent: {fontSize: 14},
    numberWrap: {flex: 1},
    numberInput: {},
    numberContent: {textAlign: 'left', writingDirection: 'ltr', fontSize: 16},
})
