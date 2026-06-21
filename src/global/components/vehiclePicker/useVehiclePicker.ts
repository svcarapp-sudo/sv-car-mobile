import {useState} from 'react'

import {useVehicleApi} from '@/global/hooks'
import {MAX_VEHICLES, useVehicleStore} from '@/global/store'
import type {Vehicle} from '@/global/types'
import {haptics} from '@/global/utils'

import {showToast} from '../toast'

/** Standard "active vehicle changed" feedback: success haptic + confirming toast. */
export const notifyVehicleSwitched = (vehicle?: Vehicle | null) => {
    haptics.success()
    if (vehicle) showToast(`تم التبديل إلى ${vehicle.make} ${vehicle.model}`, 'success')
}

/**
 * Drives a pick-a-vehicle bottom sheet: owns the open state and selection, fires
 * the switch feedback, and returns props ready to spread onto VehiclePickerSheet.
 */
export const useVehiclePicker = (onAddVehicle: () => void) => {
    const vehicles = useVehicleStore(s => s.vehicles)
    const activeVehicleId = useVehicleStore(s => s.activeVehicleId)
    const {setActiveVehicle} = useVehicleApi()
    const [open, setOpen] = useState(false)

    const handleSelect = (id: string) => {
        if (id !== activeVehicleId) {
            setActiveVehicle(id).catch(() => {})
            notifyVehicleSwitched(vehicles.find(v => v.id === id))
        }
        setOpen(false)
    }

    return {
        openPicker: () => setOpen(true),
        sheetProps: {
            visible: open,
            onClose: () => setOpen(false),
            vehicles,
            activeVehicleId,
            onSelect: handleSelect,
            onAdd: () => {
                setOpen(false)
                onAddVehicle()
            },
            maxVehicles: MAX_VEHICLES,
        },
    }
}
