import {ScrollView, StyleSheet, View} from 'react-native'

import {Card, Text, Button, Chip} from 'react-native-paper'

import type {RootStackParamList} from '@/core/navigation/types'
import {PART_CATEGORIES_LIST} from '@/shared/constants'
import type {PartCategory} from '@/shared/types'

import {useParts} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

interface PartsCategoriesScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsCategoriesScreen: React.FC<PartsCategoriesScreenProps> = ({navigation}) => {
    const {selectCategory} = useParts()

    const handleSelectCategory = (category: PartCategory) => {
        selectCategory(category)
        navigation?.navigate('PartsList', {category})
    }

    const handleViewAllParts = () => {
        selectCategory(null)
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text variant='headlineMedium' style={styles.title}>
                        Browse Parts
                    </Text>
                    <Text variant='bodyMedium' style={styles.subtitle}>
                        Browse parts by category
                    </Text>
                </View>
                <Button mode='outlined' onPress={() => navigation?.navigate('Vehicles')} style={styles.changeButton}>
                    Change Vehicle
                </Button>
            </View>

            <Button mode='contained' onPress={handleViewAllParts} style={styles.allPartsButton}>
                View All Parts
            </Button>

            <Text variant='titleMedium' style={styles.sectionTitle}>
                Categories
            </Text>

            <View style={styles.categoriesGrid}>
                {PART_CATEGORIES_LIST.map(category => {
                    return (
                        <Card key={category.id} style={styles.categoryCard} onPress={() => handleSelectCategory(category.id)}>
                            <Card.Content style={styles.categoryContent}>
                                <Text variant='titleMedium' style={styles.categoryName}>
                                    {category.name}
                                </Text>
                                {category.description && (
                                    <Text variant='bodySmall' style={styles.categoryDescription}>
                                        {category.description}
                                    </Text>
                                )}
                                <Chip icon='package-variant' style={styles.countChip}>
                                    View Parts
                                </Chip>
                            </Card.Content>
                        </Card>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        opacity: 0.7,
    },
    changeButton: {
        marginLeft: 8,
    },
    allPartsButton: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
        fontWeight: 'bold',
    },
    categoriesGrid: {
        gap: 12,
    },
    categoryCard: {
        marginBottom: 12,
        elevation: 2,
    },
    categoryContent: {
        paddingVertical: 8,
    },
    categoryName: {
        marginBottom: 4,
    },
    categoryDescription: {
        opacity: 0.6,
        marginBottom: 8,
    },
    countChip: {
        alignSelf: 'flex-start',
    },
})
