import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {PartsCategoriesScreen, PartsListScreen, PartDetailScreen} from '@/features/parts'
import {VehicleListScreen, AddVehicleScreen} from '@/features/vehicles'
import {AppHeader, MainLayout} from '@/shared/layouts'

import {LaunchScreen} from '../screens/LaunchScreen'

import type {RootStackParamList} from './types'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي',
    ADD_VEHICLE: 'إضافة مركبة',
    BROWSE_CATEGORIES: 'تصفح الفئات',
    PARTS: 'قطع الغيار',
    DETAIL: 'التفاصيل',
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const MainFlow = () => {
    return (
        <MainLayout>
            <Stack.Navigator
                initialRouteName='Vehicles'
                screenOptions={{
                    header: props => <AppHeader {...props} />,
                }}>
                <Stack.Screen
                    name='Vehicles'
                    component={VehicleListScreen}
                    options={{
                        title: ARABIC_TEXT.MY_VEHICLE,
                    }}
                />
                <Stack.Screen
                    name='AddVehicle'
                    component={AddVehicleScreen}
                    options={{
                        title: ARABIC_TEXT.ADD_VEHICLE,
                    }}
                />
                <Stack.Screen
                    name='PartsCategories'
                    component={PartsCategoriesScreen}
                    options={{
                        title: ARABIC_TEXT.BROWSE_CATEGORIES,
                    }}
                />
                <Stack.Screen
                    name='PartsList'
                    component={PartsListScreen}
                    options={({route}) => ({
                        title: route.params?.category || ARABIC_TEXT.PARTS,
                    })}
                />
                <Stack.Screen
                    name='PartDetail'
                    component={PartDetailScreen}
                    options={{
                        title: ARABIC_TEXT.DETAIL,
                    }}
                />
            </Stack.Navigator>
        </MainLayout>
    )
}

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Launch' component={LaunchScreen} />
                <Stack.Screen name='Main' component={MainFlow} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
