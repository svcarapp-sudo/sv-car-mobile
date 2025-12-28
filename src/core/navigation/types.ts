import type {PartCategory} from '@/shared/types'

export type RootStackParamList = {
    Vehicles: undefined
    AddVehicle: undefined
    EditVehicle: {vehicleId: string}
    PartsCategories: undefined
    PartsList: {category: PartCategory | null}
    PartDetail: {partId: string}
}
