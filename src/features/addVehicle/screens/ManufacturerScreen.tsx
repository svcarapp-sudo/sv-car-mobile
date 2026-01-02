import {StyleSheet, View, TouchableOpacity, FlatList, Image} from 'react-native'
import {Text, Card, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

import type {Manufacturer} from '../types'

const ARABIC_TEXT = {
    SELECT_MANUFACTURER: 'اختر الشركة المصنعة',
}

export const getLogoUrl = (name: string) => {
    const fileName = name.toLowerCase().replace(/\s+/g, '-')

    return `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${fileName}.png`
}

interface ManufacturerScreenProps {
    value: string
    onSelect: (manufacturer: string) => void
    onNext: () => void
}

export const ManufacturerScreen = ({value, onSelect, onNext}: ManufacturerScreenProps) => {
    const {manufacturers} = useVehicleInfo()
    const theme = useTheme()

    // Group manufacturers by country
    const groupedManufacturers = manufacturers.reduce(
        (acc, curr) => {
            const country = curr.country || 'أخرى'

            if (!acc[country]) {
                acc[country] = []
            }

            acc[country].push(curr)

            return acc
        },
        {} as Record<string, Manufacturer[]>
    )

    const sections = Object.keys(groupedManufacturers).map(country => ({
        title: country,
        data: groupedManufacturers[country],
    }))

    const handleSelect = async (manufacturer: Manufacturer) => {
        onSelect(manufacturer.name)
        onNext()
    }

    const renderManufacturerItem = ({item}: {item: Manufacturer}) => {
        const isSelected = value === item.name
        const logoUrl = getLogoUrl(item.name)

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[styles.gridItem, isSelected && {borderColor: theme.colors.primary, borderWidth: 2}]}>
                <Card
                    style={[styles.card, {backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface}]}
                    mode={isSelected ? 'contained' : 'outlined'}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.logoContainer}>
                            <Image
                                key={logoUrl}
                                source={{
                                    uri: logoUrl,
                                }}
                                style={styles.logo}
                                resizeMode='contain'
                            />
                        </View>
                        <Text
                            variant='labelMedium'
                            numberOfLines={1}
                            style={[
                                styles.brandName,
                                {
                                    color: isSelected ? theme.colors.primary : theme.colors.onSurface,
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                },
                            ]}>
                            {item.name}
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={sections}
                keyExtractor={item => item.title}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.SELECT_MANUFACTURER}
                        </Text>
                    </View>
                }
                renderItem={({item: section}) => (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionHeaderLine, {backgroundColor: theme.colors.primary}]} />
                            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.primary}]}>
                                {section.title}
                            </Text>
                        </View>
                        <View style={styles.gridRow}>
                            {section.data.map(item => (
                                <View key={item.name} style={styles.gridItemContainer}>
                                    {renderManufacturerItem({item})}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        marginBottom: 16,
    },
    stepTitle: {
        fontWeight: 'bold',
        width: '100%',
    },
    gridContainer: {
        paddingBottom: 24,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    sectionHeaderLine: {
        width: 4,
        height: 20,
        borderRadius: 2,
        marginEnd: 8,
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItemContainer: {
        width: '33.33%',
    },
    gridItem: {
        margin: 6,
        borderRadius: 12,
        overflow: 'hidden',
    },
    card: {
        borderRadius: 12,
    },
    cardContent: {
        alignItems: 'center',
        padding: 8,
    },
    logoContainer: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F8FAFC',
        borderRadius: 32,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    logo: {
        width: 42,
        height: 42,
    },
    brandName: {
        textAlign: 'center',
    },
})
