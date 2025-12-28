import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {PartsCategoriesScreen, PartsListScreen, PartDetailScreen} from '@/features/parts'
import {VehicleListScreen, AddVehicleScreen, EditVehicleScreen} from '@/features/vehicles'

import type {RootStackParamList} from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Vehicles'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#6200ee',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name='Vehicles'
                    component={VehicleListScreen}
                    options={{
                        title: 'My Vehicles',
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
                    name='EditVehicle'
                    component={EditVehicleScreen}
                    options={{
                        title: 'Edit Vehicle',
                    }}
                />
                <Stack.Screen
                    name='PartsCategories'
                    component={PartsCategoriesScreen}
                    options={{
                        title: 'Browse Parts',
                    }}
                />
                <Stack.Screen
                    name='PartsList'
                    component={PartsListScreen}
                    options={({route}) => ({
                        title: route.params?.category
                            ? `${route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)} Parts`
                            : 'All Parts',
                    })}
                />
                <Stack.Screen
                    name='PartDetail'
                    component={PartDetailScreen}
                    options={{
                        title: 'Part Details',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
