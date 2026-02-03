import {FlatList, StyleSheet, View} from 'react-native'
import {Card, Text, Chip, IconButton, useTheme} from 'react-native-paper'
import {useParts, usePartCategories} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

const ARABIC_TEXT = {
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
    SKU_LABEL: 'الرمز:',
    NO_PARTS_FOUND: 'لم يتم العثور على قطع',
    NO_PARTS_IN_CATEGORY: (category: string) => `لم يتم العثور على قطع في فئة ${category}`,
    NO_PARTS_DESC: 'لا توجد قطع متاحة. يرجى التأكد من اختيار مركبة.',
    LOADING: 'جاري تحميل القطع...',
    NO_PARTS_VEHICLE: 'لا توجد قطع متاحة لهذه المركبة',
    PARTS_COUNT: (count: number) => `${count} قطعة`,
}

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen = ({route, navigation}: PartsListScreenProps) => {
    const {parts, selectedCategory, loading} = useParts()
    const {getBySlug} = usePartCategories()
    const theme = useTheme()

    const category = route?.params?.category ?? selectedCategory
    const categoryFromApi = category ? getBySlug(category) : null
    let categoryInfo: {name: string; id: string} | null = null

    if (category) {
        categoryInfo = categoryFromApi ? {name: categoryFromApi.name, id: categoryFromApi.slug} : {name: category, id: category}
    }

    const renderPart = ({item: part}: {item: (typeof parts)[0]}) => {
        return (
            <Card
                style={[styles.partCard, {backgroundColor: theme.colors.surface}]}
                onPress={() => navigation?.navigate('PartDetail', {partId: part.id})}>
                <Card.Content>
                    <View style={styles.partHeader}>
                        <View style={styles.partInfo}>
                            <Text variant='titleMedium' style={[styles.partName, {color: theme.colors.primary}]}>
                                {part.name}
                            </Text>
                            {part.brand && (
                                <Text variant='bodySmall' style={[styles.partBrand, {color: theme.colors.onSurfaceVariant}]}>
                                    {part.brand}
                                </Text>
                            )}
                        </View>
                        {part.inStock ? (
                            <Chip
                                icon='check-circle'
                                style={[styles.inStockChip, {backgroundColor: '#E8F5E9'}]}
                                textStyle={{color: '#2E7D32'}}>
                                {ARABIC_TEXT.IN_STOCK}
                            </Chip>
                        ) : (
                            <Chip
                                icon='alert-circle'
                                style={[styles.outOfStockChip, {backgroundColor: '#FFEBEE'}]}
                                textStyle={{color: '#C62828'}}>
                                {ARABIC_TEXT.OUT_OF_STOCK}
                            </Chip>
                        )}
                    </View>

                    {part.description && (
                        <Text
                            variant='bodyMedium'
                            style={[styles.partDescription, {color: theme.colors.onSurfaceVariant}]}
                            numberOfLines={2}>
                            {part.description}
                        </Text>
                    )}

                    <View style={styles.partFooter}>
                        <Text variant='titleLarge' style={[styles.partPrice, {color: theme.colors.tertiary}]}>
                            ${part.price.toFixed(2)}
                        </Text>
                        {part.sku && (
                            <Text variant='bodySmall' style={[styles.partSku, {color: theme.colors.outline}]}>
                                {ARABIC_TEXT.SKU_LABEL} {part.sku}
                            </Text>
                        )}
                    </View>

                    <Chip icon='tag' style={[styles.categoryChip, {backgroundColor: theme.colors.secondaryContainer}]}>
                        {getBySlug(part.category)?.name ?? part.category}
                    </Chip>
                </Card.Content>
            </Card>
        )
    }

    if (parts.length === 0 && !loading) {
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <View style={styles.emptyContainer}>
                    <Text variant='headlineSmall' style={[styles.emptyTitle, {color: theme.colors.onBackground}]}>
                        {ARABIC_TEXT.NO_PARTS_FOUND}
                    </Text>
                    <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                        {categoryInfo ? ARABIC_TEXT.NO_PARTS_IN_CATEGORY(categoryInfo.name) : ARABIC_TEXT.NO_PARTS_DESC}
                    </Text>
                    <IconButton
                        icon='car'
                        size={48}
                        iconColor={theme.colors.primary}
                        onPress={() => navigation?.navigate('AddVehicle')}
                        style={styles.iconButton}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            {categoryInfo && (
                <View style={[styles.header, {backgroundColor: theme.colors.surfaceVariant}]}>
                    <Text variant='headlineSmall' style={[styles.headerTitle, {color: theme.colors.primary}]}>
                        {categoryInfo.name}
                    </Text>
                    <Text variant='bodyMedium' style={[styles.headerSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC_TEXT.PARTS_COUNT(parts.length)}
                    </Text>
                </View>
            )}
            <FlatList
                data={parts}
                renderItem={renderPart}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant}}>
                            {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.NO_PARTS_VEHICLE}
                        </Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        paddingBottom: 8,
    },
    headerTitle: {
        marginBottom: 4,
    },
    headerSubtitle: {
        opacity: 0.7,
    },
    listContent: {
        padding: 16,
    },
    partCard: {
        marginBottom: 12,
        elevation: 2,
    },
    partHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    partInfo: {
        flex: 1,
        marginEnd: 8,
    },
    partName: {
        marginBottom: 4,
    },
    partBrand: {
        opacity: 0.6,
    },
    inStockChip: {
        backgroundColor: '#e8f5e9',
    },
    outOfStockChip: {
        backgroundColor: '#ffebee',
    },
    partDescription: {
        marginBottom: 12,
        opacity: 0.7,
    },
    partFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    partPrice: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    partSku: {
        opacity: 0.5,
    },
    categoryChip: {
        alignSelf: 'flex-start',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        opacity: 0.7,
    },
    iconButton: {
        marginTop: 16,
    },
})
