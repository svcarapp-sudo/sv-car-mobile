import {StyleSheet} from 'react-native'
import {TextInput} from 'react-native-paper'

import {getSellerTypeFieldConfig} from '@/global/components'
import type {SellerType} from '@/global/types'

const ARABIC = {
    CITY: 'المدينة (اختياري)',
    WORKING_HOURS: 'ساعات العمل (اختياري)',
    DESCRIPTION: 'وصف (اختياري)',
}

interface GateTypeFieldsProps {
    sellerTypes: SellerType[]
    sellerTypeId: number
    storeName: string
    city: string
    workingHours: string
    description: string
    onChangeStoreName: (value: string) => void
    onChangeCity: (value: string) => void
    onChangeWorkingHours: (value: string) => void
    onChangeDescription: (value: string) => void
}

export const GateTypeFields = ({
    sellerTypes,
    sellerTypeId,
    storeName,
    city,
    workingHours,
    description,
    onChangeStoreName,
    onChangeCity,
    onChangeWorkingHours,
    onChangeDescription,
}: GateTypeFieldsProps) => {
    const selectedSlug = sellerTypes.find(t => t.id === sellerTypeId)?.slug
    const fields = getSellerTypeFieldConfig(selectedSlug)

    return (
        <>
            {fields.showStoreName && (
                <TextInput
                    label={fields.storeNameLabel}
                    value={storeName}
                    onChangeText={onChangeStoreName}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='store-outline' />}
                />
            )}
            {fields.showCity && (
                <TextInput
                    label={ARABIC.CITY}
                    value={city}
                    onChangeText={onChangeCity}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='map-marker-outline' />}
                />
            )}
            {fields.showWorkingHours && (
                <TextInput
                    label={ARABIC.WORKING_HOURS}
                    value={workingHours}
                    onChangeText={onChangeWorkingHours}
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon='clock-outline' />}
                    placeholder='مثال: 9 ص - 9 م'
                />
            )}
            {fields.showDescription && (
                <TextInput
                    label={ARABIC.DESCRIPTION}
                    value={description}
                    onChangeText={onChangeDescription}
                    mode='outlined'
                    multiline
                    numberOfLines={2}
                    style={styles.input}
                    left={<TextInput.Icon icon='text-box-outline' />}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {marginBottom: 12},
})
