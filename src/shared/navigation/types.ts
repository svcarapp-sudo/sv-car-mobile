import type {PartCategory} from '@/shared/types'

export type RootStackParamList = {
    Launch: undefined
    Main: undefined
    Home: undefined
    AddVehicle: undefined
    PartsCategories: undefined
    PartsList: {category: PartCategory | null}
    PartDetail: {partId: string}
}
