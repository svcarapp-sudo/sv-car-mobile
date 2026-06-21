import {VehiclePickerSheet, useVehiclePicker} from '@/global/components'
import type {Vehicle} from '@/global/types'

import {AddPartRequestVehicleCard} from './AddPartRequestVehicleCard'

interface AddPartRequestVehicleSectionProps {
    vehicle: Vehicle | null
    onAddVehicle: () => void
}

/**
 * Target-vehicle card plus the shared vehicle picker. "Change" opens the picker
 * to switch the request's target vehicle (the app-wide active vehicle).
 */
export const AddPartRequestVehicleSection = ({vehicle, onAddVehicle}: AddPartRequestVehicleSectionProps) => {
    const {openPicker, sheetProps} = useVehiclePicker(onAddVehicle)

    return (
        <>
            <AddPartRequestVehicleCard vehicle={vehicle} onAddVehicle={onAddVehicle} onChangeVehicle={openPicker} />
            <VehiclePickerSheet {...sheetProps} />
        </>
    )
}
