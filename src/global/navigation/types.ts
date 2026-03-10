import type {PartCategory} from '@/global/types'

export type RootStackParamList = {
    Launch: undefined
    Login: undefined
    Register: undefined
    Main:
        | {screen: 'Home'; params?: undefined}
        | {screen: 'AddVehicle'; params?: {vehicleId?: string}}
        | {screen: 'PartsCategories'; params?: undefined}
        | {screen: 'PartsList'; params: {category: PartCategory | null}}
        | {screen: 'PartDetail'; params: {partId: string}}
        | {screen: 'MyParts'; params?: undefined}
        | {screen: 'AddPart'; params?: undefined}
        | {screen: 'EditPart'; params: {partId: string}}
        | {screen: 'MyAccount'; params?: undefined}
        | undefined
    Home: undefined
    AddVehicle: {vehicleId?: string} | undefined
    PartsCategories: undefined
    PartsList: {category: PartCategory | null}
    PartDetail: {partId: string}
    MyParts: undefined
    AddPart: undefined
    EditPart: {partId: string}
    MyAccount: undefined
}
