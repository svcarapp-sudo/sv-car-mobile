import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {LoginScreen, RegisterScreen} from '@/features/auth'
import {PartsCategoriesScreen, PartsListScreen, PartDetailScreen} from '@/features/parts'
import {HomeScreen} from '@/features/home'
import {AddVehicleScreen} from '@/features/addVehicle'
import {MyPartsListScreen, EditPartScreen} from '@/features/myParts'
import {AddPartScreen} from '@/features/addPart'
import {MyAccountScreen} from '@/features/account'
import {MainLayout} from '@/global/layouts'

import {LaunchScreen} from '../components'

import type {RootStackParamList} from './types'
import {navigationRef} from './navigationRef'

const ARABIC_TEXT = {
    MY_VEHICLE: 'مركبتي',
    ADD_VEHICLE: 'إضافة مركبة',
    BROWSE_CATEGORIES: 'تصفح الفئات',
    PARTS: 'قطع الغيار',
    DETAIL: 'التفاصيل',
    ADD_PART: 'إضافة قطعة غيار',
    MY_PARTS: 'قطع الغيار الخاصة بي',
    EDIT_PART: 'تعديل قطعة غيار',
    MY_ACCOUNT: 'حسابي',
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const MainFlow = () => {
    const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Main'>>()

    return (
        <MainLayout
            onLogout={() => {
                rootNavigation.reset({index: 0, routes: [{name: 'Login'}]})
            }}>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
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
                    getId={({params}) => `PartsList-${params?.category || 'all'}`}
                />
                <Stack.Screen
                    name='PartDetail'
                    component={PartDetailScreen}
                    options={{
                        title: ARABIC_TEXT.DETAIL,
                    }}
                />
                <Stack.Screen
                    name='MyParts'
                    component={MyPartsListScreen}
                    options={{
                        title: ARABIC_TEXT.MY_PARTS,
                    }}
                />
                <Stack.Screen
                    name='AddPart'
                    component={AddPartScreen}
                    options={{
                        title: ARABIC_TEXT.ADD_PART,
                    }}
                />
                <Stack.Screen
                    name='EditPart'
                    component={EditPartScreen}
                    options={{
                        title: ARABIC_TEXT.EDIT_PART,
                    }}
                />
                <Stack.Screen
                    name='MyAccount'
                    component={MyAccountScreen}
                    options={{
                        title: ARABIC_TEXT.MY_ACCOUNT,
                    }}
                />
            </Stack.Navigator>
        </MainLayout>
    )
}

export const AppNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Launch' component={LaunchScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Main' component={MainFlow} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
