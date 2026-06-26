import {StyleSheet, View} from 'react-native'
import {SegmentedButtons, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {PartConditionValue} from '@/global/types'

const ARABIC = {
    LABEL: 'الحالة',
    NEW: 'جديد',
    USED: 'مستعمل',
    REFURBISHED: 'مجدّد',
}

interface PartConditionSelectorProps {
    value: PartConditionValue
    onChange: (value: PartConditionValue) => void
}

export const PartConditionSelector = ({value, onChange}: PartConditionSelectorProps) => {
    const theme = useAppTheme()
    return (
        <View style={styles.wrap}>
            <Text variant='labelLarge' style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC.LABEL}
            </Text>
            <SegmentedButtons
                value={value}
                onValueChange={v => onChange(v as PartConditionValue)}
                density='small'
                buttons={[
                    {value: 'NEW', label: ARABIC.NEW, icon: 'star-four-points-outline'},
                    {value: 'USED', label: ARABIC.USED, icon: 'recycle-variant'},
                    {value: 'REFURBISHED', label: ARABIC.REFURBISHED, icon: 'tools'},
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {marginBottom: 14, gap: 6},
    label: {fontWeight: '700'},
})
