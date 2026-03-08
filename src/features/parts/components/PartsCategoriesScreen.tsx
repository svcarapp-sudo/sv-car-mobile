import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'
import type {RootStackParamList} from '@/global/navigation/types'
import type {PartCategory} from '@/global/types'
import {useAppTheme, useParts, usePartCategories} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    TITLE: 'تصفح قطع الغيار',
    SUBTITLE: 'تصفح قطع الغيار حسب الفئة',
    CHANGE_VEHICLE: 'تغيير المركبة',
    VIEW_ALL: 'عرض جميع القطع',
    VIEW_ALL_DESC: 'تصفح جميع القطع المتاحة لمركبتك',
    CATEGORIES: 'الفئات',
    VIEW_PARTS: 'عرض القطع',
}

interface PartsCategoriesScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsCategoriesScreen: React.FC<PartsCategoriesScreenProps> = ({navigation}) => {
    const {selectCategory} = useParts()
    const {categories, loading} = usePartCategories()
    const categoriesList = categories ?? []
    const theme = useAppTheme()

    const handleSelectCategory = (slug: PartCategory) => {
        selectCategory(slug)
        navigation?.navigate('PartsList', {category: slug})
    }

    const handleViewAllParts = () => {
        selectCategory(null)
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                    <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation?.navigate('AddVehicle')}
                    activeOpacity={0.7}
                    style={[styles.changeVehicleBtn, {borderColor: theme.colors.outline}]}>
                    <Icon source='car-outline' size={16} color={theme.colors.primary} />
                    <Text style={[styles.changeVehicleText, {color: theme.colors.primary}]}>{ARABIC_TEXT.CHANGE_VEHICLE}</Text>
                </TouchableOpacity>
            </View>

            {/* View All banner */}
            <TouchableOpacity onPress={handleViewAllParts} activeOpacity={0.8}>
                <View style={[styles.viewAllBanner, {backgroundColor: theme.colors.primary}]}>
                    <View style={styles.viewAllContent}>
                        <View style={[styles.viewAllIcon, {backgroundColor: theme.colors.onDarkContainer}]}>
                            <Icon source='view-grid-outline' size={22} color={theme.colors.onPrimary} />
                        </View>
                        <View style={styles.viewAllText}>
                            <Text style={styles.viewAllTitle}>{ARABIC_TEXT.VIEW_ALL}</Text>
                            <Text style={styles.viewAllDesc}>{ARABIC_TEXT.VIEW_ALL_DESC}</Text>
                        </View>
                    </View>
                    <Icon source='chevron-left' size={22} color={theme.colors.onDarkLow} />
                </View>
            </TouchableOpacity>

            {/* Section title */}
            <View style={styles.sectionRow}>
                <View style={[styles.sectionDot, {backgroundColor: theme.colors.tertiary}]} />
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.CATEGORIES}</Text>
            </View>

            {/* Categories grid */}
            {loading && categoriesList.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='small' color={theme.colors.primary} />
                </View>
            ) : (
                <View style={styles.categoriesGrid}>
                    {categoriesList
                        .slice()
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map(category => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => handleSelectCategory(category.slug as PartCategory)}
                                activeOpacity={0.7}>
                                <View style={[styles.categoryCard, {backgroundColor: theme.colors.surface}]}>
                                    <View style={styles.categoryTop}>
                                        <View style={[styles.categoryIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                                            <Icon
                                                source={category.icon || 'package-variant'}
                                                size={22}
                                                color={theme.colors.primary}
                                            />
                                        </View>
                                        <Icon source='chevron-left' size={18} color={theme.colors.outline} />
                                    </View>
                                    <Text style={[styles.categoryName, {color: theme.colors.onSurface}]} numberOfLines={2}>
                                        {category.name}
                                    </Text>
                                    {category.description && (
                                        <Text
                                            style={[styles.categoryDescription, {color: theme.colors.onSurfaceVariant}]}
                                            numberOfLines={2}>
                                            {category.description}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
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

    // Header
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

    // View All banner
    viewAllBanner: {
        borderRadius: 20,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    viewAllContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    viewAllIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    viewAllText: {
        flex: 1,
    },
    viewAllTitle: {
        color: themeColors.onPrimary,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.1,
        marginBottom: 2,
    },
    viewAllDesc: {
        color: themeColors.onDarkLow,
        fontSize: 12,
        letterSpacing: 0.1,
    },

    // Section title
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

    // Categories
    categoriesGrid: {
        gap: 10,
    },
    categoryCard: {
        borderRadius: 20,
        padding: 18,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.1,
        marginBottom: 4,
    },
    categoryDescription: {
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0.1,
        opacity: 0.6,
    },

    loadingContainer: {
        paddingVertical: 32,
        alignItems: 'center',
    },
})
