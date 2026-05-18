import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {PartsSearchBar, VehicleContextBar} from '../shared'

const ARABIC_TEXT = {
    SEARCH_PLACEHOLDER: 'ابحث عن قطعة...',
    PARTS_COUNT: (count: number) => `${count} قطعة متاحة`,
    ALL_PARTS: 'جميع القطع',
    NO_PARTS: 'لا توجد قطع',
}

interface PartsListHeaderProps {
    categoryName: string | null
    partsCount: number
    search: string
    onSearchChange: (text: string) => void
    onChangeVehicle: () => void
    onAddVehicle: () => void
}

export const PartsListHeader = ({
    categoryName,
    partsCount,
    search,
    onSearchChange,
    onChangeVehicle,
    onAddVehicle,
}: PartsListHeaderProps) => {
    const theme = useAppTheme()
    const title = categoryName || ARABIC_TEXT.ALL_PARTS
    const countLabel = partsCount > 0 ? ARABIC_TEXT.PARTS_COUNT(partsCount) : ARABIC_TEXT.NO_PARTS

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <View style={styles.titleRow}>
                <View style={[styles.dot, {backgroundColor: theme.colors.tertiary}]} />
                <View style={styles.titleBlock}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={[styles.count, {color: theme.colors.onSurfaceVariant}]}>{countLabel}</Text>
                </View>
            </View>

            <PartsSearchBar value={search} onChangeText={onSearchChange} placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER} elevated />

            <VehicleContextBar onChangeVehicle={onChangeVehicle} onAddVehicle={onAddVehicle} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 10,
        gap: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    dot: {width: 4, height: 26, borderRadius: 2},
    titleBlock: {flex: 1, gap: 2},
    title: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    count: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
})
