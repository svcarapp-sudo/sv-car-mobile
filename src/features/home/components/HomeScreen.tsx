import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {useTheme} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/shared/navigation/types'
import {useVehicles} from '@/features/addVehicle/hooks'
import {useParts} from '@/features/parts/hooks'
import type {PartCategory} from '@/shared/types'
import {EmptyState} from './EmptyState'
import {VehicleSummary} from './VehicleSummary'
import {QuickActions} from './QuickActions'
import {CategoryGrid} from './CategoryGrid'

interface HomeScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const {vehicle} = useVehicles()
    const {selectCategory} = useParts()
    const theme = useTheme()

    const handleAddVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleChangeVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleBrowseParts = () => {
        navigation?.navigate('PartsCategories')
    }

    const handleSelectCategory = (category: PartCategory) => {
        selectCategory(category)
        navigation?.navigate('PartsList', {category})
    }

    const handleViewAllParts = () => {
        selectCategory(null)
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {!vehicle ? (
                    <EmptyState onAddVehicle={handleAddVehicle} />
                ) : (
                    <>
                        <VehicleSummary vehicle={vehicle} onChangeVehicle={handleChangeVehicle} />
                        <QuickActions onBrowseParts={handleBrowseParts} />
                        <CategoryGrid onSelectCategory={handleSelectCategory} onViewAll={handleViewAllParts} />
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
})
