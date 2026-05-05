import {useState, useMemo} from 'react'
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {Dialog, Portal, Text, TextInput} from 'react-native-paper'
import type {CountryCode} from 'libphonenumber-js'

import {useAppTheme} from '@/global/hooks'

interface Country {
    code: CountryCode
    dial: string
    flag: string
    label: string
}

interface CountryCodePickerProps {
    visible: boolean
    selectedCode: string
    countries: Country[]
    onSelect: (country: Country) => void
    onDismiss: () => void
}

export const CountryCodePicker = ({visible, selectedCode, countries, onSelect, onDismiss}: CountryCodePickerProps) => {
    const theme = useAppTheme()
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        if (!search.trim()) return countries
        const q = search.trim().toLowerCase()
        return countries.filter(c => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dial.includes(q))
    }, [search, countries])

    const handleDismiss = () => {
        onDismiss()
        setSearch('')
    }

    const handleSelect = (item: Country) => {
        onSelect(item)
        setSearch('')
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={handleDismiss} style={styles.dialog}>
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
                                onPress={() => handleSelect(item)}
                                style={[
                                    styles.row,
                                    item.code === selectedCode && {backgroundColor: theme.colors.primaryContainer},
                                ]}>
                                <Text style={styles.rowFlag}>{item.flag}</Text>
                                <Text variant='bodyMedium' style={[styles.rowLabel, {color: theme.colors.onSurface}]}>
                                    {item.label}
                                </Text>
                                <Text variant='bodySmall' style={{color: theme.colors.onSurfaceVariant}}>
                                    {item.dial}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyboardShouldPersistTaps='handled'
                        initialNumToRender={20}
                        style={styles.list}
                    />
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {maxHeight: '80%'},
    dialogContent: {paddingHorizontal: 0, maxHeight: 450},
    searchInput: {marginHorizontal: 16, marginBottom: 8},
    list: {maxHeight: 350},
    row: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12},
    rowFlag: {fontSize: 22, width: 30, textAlign: 'center'},
    rowLabel: {flex: 1},
})
