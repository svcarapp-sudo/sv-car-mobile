import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Vehicle} from '@/global/types'

import {AddPartRequestVehicleSection} from '../AddPartRequestVehicleSection'

const T = {
    HINT_HAS: 'سيُنشر الطلب لهذه المركبة. يمكنك تغييرها.',
    HINT_NONE: 'أضف مركبتك لتتمكن من المتابعة.',
}

interface VehicleStepProps {
    vehicle: Vehicle | null
    onAddVehicle: () => void
}

export const VehicleStep = ({vehicle, onAddVehicle}: VehicleStepProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.content}>
            <AddPartRequestVehicleSection vehicle={vehicle} onAddVehicle={onAddVehicle} />
            <View style={styles.hintRow}>
                <Icon source='information-outline' size={14} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>{vehicle ? T.HINT_HAS : T.HINT_NONE}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {paddingTop: 4, gap: 14},
    hintRow: {flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4},
    hint: {fontSize: 12, fontWeight: '600', flex: 1},
})
