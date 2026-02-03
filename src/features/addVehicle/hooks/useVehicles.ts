import {useVehicles as useVehiclesShared} from '@/global/hooks'

/** Re-export from shared. Add-vehicle feature uses shared for isolation. */
export const useVehicles = useVehiclesShared
