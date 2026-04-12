import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'
import type {RootStackParamList} from '@/global/navigation/types'
import type {PartCategory} from '@/global/types'
import {useAppTheme, useCatalog} from '@/global/hooks'
import {ViewAllBanner} from './ViewAllBanner'
import {PartsCategoryCard} from './PartsCategoryCard'

const ARABIC_TEXT = {
    TITLE: 'تصفح قطع الغيار',
    SUBTITLE: 'تصفح قطع الغيار حسب الفئة',
    CHANGE_VEHICLE: 'تغيير المركبة',
    CATEGORIES: 'الفئات',
}

interface PartsCategoriesScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsCategoriesScreen: React.FC<PartsCategoriesScreenProps> = ({navigation}) => {
    const {categories, categoriesLoading: loading} = useCatalog()
    const categoriesList = categories ?? []
    const theme = useAppTheme()

    const handleSelectCategory = (slug: PartCategory) => {
        navigation?.navigate('PartsList', {category: slug})
    }

    const handleViewAllParts = () => {
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation?.navigate('AddVehicle')}
                    activeOpacity={0.7}
                    style={[styles.changeVehicleBtn, {borderColor: theme.colors.outline}]}>
                    <Icon source="car-outline" size={16} color={theme.colors.primary} />
                    <Text style={[styles.changeVehicleText, {color: theme.colors.primary}]}>{ARABIC_TEXT.CHANGE_VEHICLE}</Text>
                </TouchableOpacity>
            </View>

            <ViewAllBanner onPress={handleViewAllParts} />

            <View style={styles.sectionRow}>
                <View style={[styles.sectionDot, {backgroundColor: theme.colors.tertiary}]} />
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.CATEGORIES}</Text>
            </View>

            {loading && categoriesList.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
            ) : (
                <View style={styles.categoriesGrid}>
                    {categoriesList
                        .slice()
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map(category => (
                            <PartsCategoryCard
                                key={category.id}
                                name={category.name}
                                description={category.description}
                                icon={category.icon}
                                onPress={() => handleSelectCategory(category.slug as PartCategory)}
                            />
                        ))}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    headerLeft: {
        flex: 1,
        marginEnd: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.3,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        letterSpacing: 0.1,
        opacity: 0.7,
    },
    changeVehicleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
    },
    changeVehicleText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionDot: {
        width: 4,
        height: 18,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.1,
    },
    categoriesGrid: {
        gap: 10,
    },
    loadingContainer: {
        paddingVertical: 32,
        alignItems: 'center',
    },
})
