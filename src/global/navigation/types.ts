import type {PartCategory} from '@/global/types'

export type RootStackParamList = {
    Launch: undefined
    Login: undefined
    Register: undefined
    Main: undefined
    Home: undefined
    AddVehicle: {vehicleId?: string} | undefined
    PartsCategories: undefined
    PartsList: {category: PartCategory | null}
    PartDetail: {partId: string}
}
