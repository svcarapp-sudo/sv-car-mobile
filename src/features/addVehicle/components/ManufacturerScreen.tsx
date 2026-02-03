import {useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity, FlatList, Image} from 'react-native'
import {Text, Card, useTheme, ActivityIndicator} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

import type {MakeApi} from '../services'

const ARABIC_TEXT = {
    SELECT_MANUFACTURER: 'اختر الشركة المصنعة',
}

interface ManufacturerScreenProps {
    originId: number | null
    value: string
    valueId: string | null
    onSelect: (name: string, id: string, logoUrl?: string | null) => void
    onNext: () => void
}

export const ManufacturerScreen = ({originId, value: _value, valueId, onSelect, onNext}: ManufacturerScreenProps) => {
    const {getMakes} = useVehicleInfo()
    const theme = useTheme()
    const [makes, setMakes] = useState<MakeApi[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let cancelled = false
        // Loading must be true when starting fetch; rule discourages sync setState in effect
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show loading while fetching
        setLoading(true)
        getMakes(originId ?? undefined)
            .then(list => {
                if (!cancelled) {
                    setMakes(list)
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [originId, getMakes])

    const groupedMakes = makes.reduce<Record<string, MakeApi[]>>((acc, curr) => {
        const country = curr.originCountry ?? 'أخرى'

        if (!acc[country]) {
            acc[country] = []
        }

        acc[country].push(curr)

        return acc
    }, {})

    const sections = Object.keys(groupedMakes).map(title => ({title, data: groupedMakes[title]}))

    const handleSelect = (make: MakeApi) => {
        onSelect(make.name, make.id, make.logoUrl ?? undefined)
        onNext()
    }

    const renderManufacturerItem = ({item}: {item: MakeApi}) => {
        const isSelected = valueId === item.id
        const logoUrl = item.logoUrl ?? null

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[styles.gridItem, isSelected && {borderColor: theme.colors.primary, borderWidth: 2}]}>
                <Card
                    style={[styles.card, {backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface}]}
                    mode={isSelected ? 'contained' : 'outlined'}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.logoContainer}>
                            {logoUrl ? <Image source={{uri: logoUrl}} style={styles.logo} resizeMode='contain' /> : null}
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

    if (loading && makes.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    جاري تحميل الماركات...
                </Text>
            </View>
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
                                <View key={item.id} style={styles.gridItemContainer}>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
