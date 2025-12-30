import {ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'
import {Card, Text, Button, Chip, useTheme} from 'react-native-paper'
import {PART_CATEGORIES_LIST} from '@/shared/constants'
import type {RootStackParamList} from '@/shared/navigation/types'
import type {PartCategory} from '@/shared/types'
import {useParts} from '../hooks'

const ARABIC_TEXT = {
    TITLE: 'تصفح قطع الغيار',
    SUBTITLE: 'تصفح قطع الغيار حسب الفئة',
    CHANGE_VEHICLE: 'تغيير المركبة',
    VIEW_ALL: 'عرض جميع القطع',
    CATEGORIES: 'الفئات',
    VIEW_PARTS: 'عرض القطع',
}

interface PartsCategoriesScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsCategoriesScreen: React.FC<PartsCategoriesScreenProps> = ({navigation}) => {
    const {selectCategory} = useParts()
    const theme = useTheme()

    const handleSelectCategory = (category: PartCategory) => {
        selectCategory(category)
        navigation?.navigate('PartsList', {category})
    }

    const handleViewAllParts = () => {
        selectCategory(null)
        navigation?.navigate('PartsList', {category: null})
    }

    return (
        <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.primary}]}>
                        {ARABIC_TEXT.TITLE}
                    </Text>
                    <Text variant='bodyMedium' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC_TEXT.SUBTITLE}
                    </Text>
                </View>
                <Button mode='outlined' onPress={() => navigation?.navigate('Vehicles')} style={styles.changeButton}>
                    {ARABIC_TEXT.CHANGE_VEHICLE}
                </Button>
            </View>

            <Button mode='contained' onPress={handleViewAllParts} style={styles.allPartsButton}>
                {ARABIC_TEXT.VIEW_ALL}
            </Button>

            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.CATEGORIES}
            </Text>

            <View style={styles.categoriesGrid}>
                {PART_CATEGORIES_LIST.map(category => {
                    return (
                        <Card
                            key={category.id}
                            style={[styles.categoryCard, {backgroundColor: theme.colors.surface}]}
                            onPress={() => handleSelectCategory(category.id)}>
                            <Card.Content style={styles.categoryContent}>
                                <Text variant='titleMedium' style={[styles.categoryName, {color: theme.colors.primary}]}>
                                    {category.name}
                                </Text>
                                {category.description && (
                                    <Text
                                        variant='bodySmall'
                                        style={[styles.categoryDescription, {color: theme.colors.onSurfaceVariant}]}>
                                        {category.description}
                                    </Text>
                                )}
                                <Chip
                                    icon='package-variant'
                                    style={[styles.countChip, {backgroundColor: theme.colors.secondaryContainer}]}>
                                    {ARABIC_TEXT.VIEW_PARTS}
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
        marginStart: 8,
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
