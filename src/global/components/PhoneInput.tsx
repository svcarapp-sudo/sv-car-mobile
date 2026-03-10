import React, {useState, useCallback, useMemo} from 'react'
import {FlatList, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Dialog, Divider, Icon, Portal, Text, TextInput} from 'react-native-paper'
import {getCountries, getCountryCallingCode, isValidPhoneNumber} from 'libphonenumber-js'
import type {CountryCode} from 'libphonenumber-js'
import {getLocales} from 'expo-localization'

import {useAppTheme} from '@/global/hooks'

// ── Country data ──────────────────────────────────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────

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

// ── Component ─────────────────────────────────────────────────────────

export const PhoneInput = ({onChange, initialValue = '', defaultCountry, disabled}: PhoneInputProps) => {
    const theme = useAppTheme()
    const countries = useMemo(list, [])

    const initCountry = useMemo(() => {
        const c = defaultCountry?.toUpperCase() ?? detect()
        return countries.find(x => x.code === c) ?? countries[0]
    }, [defaultCountry, countries])

    const [digits, setDigits] = useState(() => initialValue.replace(/[^\d]/g, ''))
    const [country, setCountry] = useState<Country>(initCountry)
    const [pickerOpen, setPickerOpen] = useState(false)
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        if (!search.trim()) return countries
        const q = search.trim().toLowerCase()
        return countries.filter(c => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dial.includes(q))
    }, [search, countries])

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
        setSearch('')
        notify(digits, c)
    }, [digits, notify])

    return (
        <View style={styles.container}>
            {/* Country code button */}
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

            {/* Number input */}
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

            {/* Country picker dialog */}
            <Portal>
                <Dialog visible={pickerOpen} onDismiss={() => { setPickerOpen(false); setSearch('') }} style={styles.dialog}>
                    <Dialog.Title>اختر الدولة</Dialog.Title>
                    <Dialog.Content style={styles.dialogContent}>
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            mode='outlined'
                            placeholder='بحث...'
                            left={<TextInput.Icon icon='magnify' />}
                            style={styles.searchInput}
                            dense
                        />
                        <FlatList
                            data={filtered}
                            keyExtractor={i => i.code}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => pickCountry(item)}
                                    style={[styles.row, item.code === country.code && {backgroundColor: theme.colors.primaryContainer}]}>
                                    <Text style={styles.rowFlag}>{item.flag}</Text>
                                    <Text variant='bodyMedium' style={[styles.rowLabel, {color: theme.colors.onSurface}]}>{item.label}</Text>
                                    <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>{item.dial}</Text>
                                </TouchableOpacity>
                            )}
                            keyboardShouldPersistTaps='handled'
                            initialNumToRender={20}
                            style={styles.list}
                        />
                    </Dialog.Content>
                </Dialog>
            </Portal>
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
    dialog: {maxHeight: '80%'},
    dialogContent: {paddingHorizontal: 0, maxHeight: 450},
    searchInput: {marginHorizontal: 16, marginBottom: 8},
    list: {maxHeight: 350},
    row: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12},
    rowFlag: {fontSize: 22, width: 30, textAlign: 'center'},
    rowLabel: {flex: 1},
})
