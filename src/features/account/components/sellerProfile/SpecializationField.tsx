import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Avatar, Button, Chip, Icon, Text} from 'react-native-paper'

import {MakeMultiSelectModal, type MakeOption} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {SellerSpecialization} from '@/global/types'

const ARABIC = {
    LABEL: 'ماركات التخصص',
    HELPER: 'اختر الماركات التي توفّر قطعها — سنطابق طلبات العملاء معها',
    EDIT: 'تعديل الماركات',
    ADD: 'اختر الماركات',
    EMPTY: 'لم تحدد أي ماركة بعد',
}

interface SpecializationFieldProps {
    value: SellerSpecialization[]
    onChange: (next: SellerSpecialization[]) => void
}

const toOptions = (items: SellerSpecialization[]): MakeOption[] =>
    items.map(s => ({id: String(s.id), name: s.name, logoUrl: s.logoUrl}))

const fromOptions = (items: MakeOption[]): SellerSpecialization[] =>
    items.map(o => ({id: Number(o.id), name: o.name, logoUrl: o.logoUrl}))

/** Seller specialization selector: selected makes as removable chips + a picker modal. */
export const SpecializationField = ({value, onChange}: SpecializationFieldProps) => {
    const theme = useAppTheme()
    const [pickerOpen, setPickerOpen] = useState(false)

    const remove = (id: number) => onChange(value.filter(s => s.id !== id))

    return (
        <View style={styles.wrap}>
            <View style={styles.labelRow}>
                <Icon source='car-multiple' size={18} color={theme.colors.tertiary} />
                <Text variant='labelLarge' style={[styles.label, {color: theme.colors.onSurface}]}>
                    {ARABIC.LABEL}
                </Text>
            </View>
            <Text variant='bodySmall' style={[styles.helper, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC.HELPER}
            </Text>

            {value.length > 0 ? (
                <View style={styles.chips}>
                    {value.map(s => (
                        <Chip
                            key={s.id}
                            onClose={() => remove(s.id)}
                            style={[styles.chip, {backgroundColor: theme.colors.primaryContainer}]}
                            textStyle={[styles.chipText, {color: theme.colors.primary}]}
                            avatar={
                                s.logoUrl ? <Avatar.Image size={20} source={{uri: s.logoUrl}} style={styles.avatar} /> : undefined
                            }>
                            {s.name}
                        </Chip>
                    ))}
                </View>
            ) : (
                <Text variant='bodySmall' style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC.EMPTY}
                </Text>
            )}

            <Button
                mode='outlined'
                icon={value.length > 0 ? 'pencil-outline' : 'plus'}
                onPress={() => setPickerOpen(true)}
                style={styles.button}>
                {value.length > 0 ? ARABIC.EDIT : ARABIC.ADD}
            </Button>

            <MakeMultiSelectModal
                visible={pickerOpen}
                initialSelected={toOptions(value)}
                onDismiss={() => setPickerOpen(false)}
                onConfirm={selected => {
                    onChange(fromOptions(selected))
                    setPickerOpen(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {marginTop: 16, gap: 8},
    labelRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    label: {fontWeight: '700'},
    helper: {lineHeight: 18},
    chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2},
    chip: {borderRadius: 999},
    chipText: {fontSize: 12.5, fontWeight: '700'},
    avatar: {backgroundColor: 'transparent'},
    empty: {fontStyle: 'italic', marginTop: 2},
    button: {borderRadius: 12, marginTop: 4, alignSelf: 'flex-start'},
})
