import type {PartCategory} from '@/global/types'

export type RootStackParamList = {
    Launch: undefined
    Main: undefined
    Home: undefined
    AddVehicle: undefined
    PartsCategories: undefined
    PartsList: {category: PartCategory | null}
    PartDetail: {partId: string}
}
