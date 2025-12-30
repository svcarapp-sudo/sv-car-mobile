import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {PartsCategoriesScreen, PartsListScreen, PartDetailScreen} from '@/features/parts'
import {VehicleListScreen, AddVehicleScreen} from '@/features/vehicles'
import {AppHeader, MainLayout} from '@/shared/layouts'

import {LaunchScreen} from '../screens/LaunchScreen'

import type {RootStackParamList} from './types'

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
                        title: 'My Vehicle',
                    }}
                />
                <Stack.Screen
                    name='AddVehicle'
                    component={AddVehicleScreen}
                    options={{
                        title: 'Add Vehicle',
                    }}
                />
                <Stack.Screen
                    name='PartsCategories'
                    component={PartsCategoriesScreen}
                    options={{
                        title: 'Browse Categories',
                    }}
                />
                <Stack.Screen
                    name='PartsList'
                    component={PartsListScreen}
                    options={({route}) => ({
                        title: route.params?.category
                            ? `${route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)}`
                            : 'Parts',
                    })}
                />
                <Stack.Screen
                    name='PartDetail'
                    component={PartDetailScreen}
                    options={{
                        title: 'Detail',
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
