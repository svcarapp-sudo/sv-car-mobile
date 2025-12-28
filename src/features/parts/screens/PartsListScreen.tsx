import {FlatList, StyleSheet, View} from 'react-native'

import {Card, Text, Chip, IconButton} from 'react-native-paper'

import type {RootStackParamList} from '@/core/navigation/types'
import {PART_CATEGORIES} from '@/shared/constants'

import {useParts} from '../hooks'

import type {NavigationProp, RouteProp} from '@react-navigation/native'

interface PartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'PartsList'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListScreen: React.FC<PartsListScreenProps> = ({route, navigation}) => {
    const {parts, selectedCategory, loading} = useParts()

    const category = route?.params?.category ?? selectedCategory
    const categoryInfo = category ? PART_CATEGORIES[category] : null

    const renderPart = ({item: part}: {item: (typeof parts)[0]}) => {
        return (
            <Card style={styles.partCard} onPress={() => navigation?.navigate('PartDetail', {partId: part.id})}>
                <Card.Content>
                    <View style={styles.partHeader}>
                        <View style={styles.partInfo}>
                            <Text variant='titleMedium' style={styles.partName}>
                                {part.name}
                            </Text>
                            {part.brand && (
                                <Text variant='bodySmall' style={styles.partBrand}>
                                    {part.brand}
                                </Text>
                            )}
                        </View>
                        {part.inStock ? (
                            <Chip icon='check-circle' style={styles.inStockChip}>
                                In Stock
                            </Chip>
                        ) : (
                            <Chip icon='alert-circle' style={styles.outOfStockChip}>
                                Out of Stock
                            </Chip>
                        )}
                    </View>

                    {part.description && (
                        <Text variant='bodyMedium' style={styles.partDescription} numberOfLines={2}>
                            {part.description}
                        </Text>
                    )}

                    <View style={styles.partFooter}>
                        <Text variant='titleLarge' style={styles.partPrice}>
                            ${part.price.toFixed(2)}
                        </Text>
                        {part.sku && (
                            <Text variant='bodySmall' style={styles.partSku}>
                                SKU: {part.sku}
                            </Text>
                        )}
                    </View>

                    <Chip icon='tag' style={styles.categoryChip}>
                        {PART_CATEGORIES[part.category].name}
                    </Chip>
                </Card.Content>
            </Card>
        )
    }

    if (parts.length === 0 && !loading) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text variant='headlineSmall' style={styles.emptyTitle}>
                        No Parts Found
                    </Text>
                    <Text variant='bodyMedium' style={styles.emptyText}>
                        {categoryInfo
                            ? `No parts found in ${categoryInfo.name} category`
                            : 'No parts available. Please ensure a vehicle is selected.'}
                    </Text>
                    <IconButton icon='car' size={48} onPress={() => navigation?.navigate('Vehicles')} style={styles.iconButton} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {categoryInfo && (
                <View style={styles.header}>
                    <Text variant='headlineSmall' style={styles.headerTitle}>
                        {categoryInfo.name}
                    </Text>
                    <Text variant='bodyMedium' style={styles.headerSubtitle}>
                        {parts.length} part{parts.length !== 1 ? 's' : ''}
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
                        <Text variant='bodyMedium'>{loading ? 'Loading parts...' : 'No parts available'}</Text>
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
        backgroundColor: '#f5f5f5',
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
        marginRight: 8,
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
