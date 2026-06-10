import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

import {PartsSearchBar, VehicleContextBar} from '../shared'

const ARABIC_TEXT = {
    TITLE: 'تصفّح قطع الغيار',
    SUBTITLE: 'ابحث عن القطعة التي تحتاجها لمركبتك',
    SEARCH_PLACEHOLDER: 'ابحث باسم القطعة أو الفئة...',
}

interface CategoriesHeroProps {
    search: string
    onSearchChange: (text: string) => void
    onSearchFocus: () => void
    onChangeVehicle: () => void
    onAddVehicle: () => void
}

/**
 * Hero block: greeting + persistent search bar + vehicle context.
 * Search-first like Noon / Airbnb 2025; vehicle pinned per eBay Motors.
 * The search bar here is an affordance — pressing it opens the parts list
 * where the real search input lives.
 */
export const CategoriesHero = ({search, onSearchChange, onSearchFocus, onChangeVehicle, onAddVehicle}: CategoriesHeroProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrapper}>
            <View style={styles.titleBlock}>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>
            </View>

            <PressableScale
                onPress={onSearchFocus}
                scaleTo={0.98}
                accessibilityRole='search'
                accessibilityLabel={ARABIC_TEXT.SEARCH_PLACEHOLDER}>
                <View pointerEvents='none'>
                    <PartsSearchBar value={search} onChangeText={onSearchChange} placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER} />
                </View>
            </PressableScale>

            <VehicleContextBar onChangeVehicle={onChangeVehicle} onAddVehicle={onAddVehicle} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 14,
        marginBottom: 8,
    },
    titleBlock: {
        marginBottom: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.4,
        marginBottom: 3,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.1,
        opacity: 0.85,
    },
})
