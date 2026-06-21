import {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {VehiclePickerSheet, useVehiclePicker} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {PartCategory} from '@/global/types'

import {BrowseAllCard} from './BrowseAllCard'
import {CategoriesGrid} from './CategoriesGrid'
import {CategoriesHero} from './CategoriesHero'

interface PartsCategoriesScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsCategoriesScreen = ({navigation}: PartsCategoriesScreenProps) => {
    const theme = useAppTheme()
    const [search, setSearch] = useState('')

    const goCategory = (slug: PartCategory) => navigation?.navigate('PartsList', {category: slug})
    const goBrowseAll = () => navigation?.navigate('PartsList', {category: null})
    const goAddVehicle = () => navigation?.navigate('AddVehicle')
    const {openPicker, sheetProps} = useVehiclePicker(goAddVehicle)

    // The hero search bar is a press-through affordance — it always opens the
    // parts list, where the real (focusable) search input lives.
    const handleSearchSubmit = () => {
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <>
            <ScrollView
                style={[styles.container, {backgroundColor: theme.colors.background}]}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'>
                <CategoriesHero
                    search={search}
                    onSearchChange={setSearch}
                    onSearchFocus={handleSearchSubmit}
                    onChangeVehicle={openPicker}
                    onAddVehicle={goAddVehicle}
                />

                <BrowseAllCard onPress={goBrowseAll} />

                <CategoriesGrid onSelectCategory={goCategory} />

                <View style={styles.bottomSpacer} />
            </ScrollView>

            <VehiclePickerSheet {...sheetProps} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    bottomSpacer: {height: 24},
})
