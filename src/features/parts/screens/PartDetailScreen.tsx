import {useState, useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Card, Text, Chip, Button, useTheme} from 'react-native-paper'
import {PART_CATEGORIES} from '@/shared/constants'
import type {Part} from '@/shared/types'
import {usePartApi} from '../hooks'
import type {CompatibilityResponse} from '../types'

interface PartDetailScreenProps {
    route?: {
        params?: {
            partId: string
        }
    }
}

export const PartDetailScreen = ({route}: PartDetailScreenProps) => {
    const partId = route?.params?.partId
    const {getPartById, checkCompatibility} = usePartApi()
    const theme = useTheme()
    const [part, setPart] = useState<Part | null>(null)
    const [compatibility, setCompatibility] = useState<CompatibilityResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPart = async () => {
            if (!partId) {
                return
            }

            setLoading(true)
            try {
                const fetchedPart = await getPartById(partId)
                setPart(fetchedPart)

                // Check compatibility - backend automatically uses user's selected vehicle
                if (fetchedPart) {
                    try {
                        const compat = await checkCompatibility(partId)
                        setCompatibility(compat)
                    } catch (error) {
                        // Compatibility check failed, but we still show the part
                        console.error('Failed to check compatibility:', error)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch part:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partId])

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text variant='headlineSmall' style={{color: theme.colors.primary}}>
                    Loading...
                </Text>
            </View>
        )
    }

    if (!part) {
        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text variant='headlineSmall' style={{color: theme.colors.error}}>
                    Part not found
                </Text>
            </View>
        )
    }

    return (
        <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]} contentContainerStyle={styles.content}>
            <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <Card.Content>
                    <View style={styles.header}>
                        <View style={styles.headerInfo}>
                            <Text variant='headlineMedium' style={[styles.partName, {color: theme.colors.primary}]}>
                                {part.name}
                            </Text>
                            {part.brand && (
                                <Text variant='titleMedium' style={[styles.partBrand, {color: theme.colors.onSurfaceVariant}]}>
                                    {part.brand}
                                </Text>
                            )}
                        </View>
                        {part.inStock ? (
                            <Chip icon='check-circle' style={{backgroundColor: '#E8F5E9'}} textStyle={{color: '#2E7D32'}}>
                                In Stock
                            </Chip>
                        ) : (
                            <Chip icon='alert-circle' style={{backgroundColor: '#FFEBEE'}} textStyle={{color: '#C62828'}}>
                                Out of Stock
                            </Chip>
                        )}
                    </View>

                    <View style={styles.priceContainer}>
                        <Text variant='displaySmall' style={[styles.price, {color: theme.colors.tertiary}]}>
                            ${part.price.toFixed(2)}
                        </Text>
                    </View>

                    <Chip icon='tag' style={[styles.categoryChip, {backgroundColor: theme.colors.secondaryContainer}]}>
                        {PART_CATEGORIES[part.category].name}
                    </Chip>

                    {part.description && (
                        <View style={styles.section}>
                            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                                Description
                            </Text>
                            <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant}}>
                                {part.description}
                            </Text>
                        </View>
                    )}

                    {part.sku && (
                        <View style={styles.section}>
                            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                                SKU
                            </Text>
                            <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant}}>
                                {part.sku}
                            </Text>
                        </View>
                    )}

                    {compatibility && (
                        <View style={styles.section}>
                            <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                                Compatibility
                            </Text>
                            <Chip
                                icon={compatibility.isCompatible ? 'check-circle' : 'close-circle'}
                                style={{
                                    backgroundColor: compatibility.isCompatible ? '#E8F5E9' : '#FFEBEE',
                                    marginBottom: 8,
                                }}
                                textStyle={{color: compatibility.isCompatible ? '#2E7D32' : '#C62828'}}>
                                {(() => {
                                    if (compatibility.isCompatible && compatibility.exactMatch) {
                                        return 'Perfect Match'
                                    }

                                    if (compatibility.isCompatible) {
                                        return 'Compatible'
                                    }

                                    return 'Not Compatible'
                                })()}
                            </Chip>
                            {compatibility.reason && (
                                <Text
                                    variant='bodySmall'
                                    style={[styles.compatibilityReason, {color: theme.colors.onSurfaceVariant}]}>
                                    {compatibility.reason}
                                </Text>
                            )}
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <Button mode='contained' style={styles.actionButton} disabled={!part.inStock}>
                            Add to Cart
                        </Button>
                        <Button mode='outlined' style={styles.actionButton}>
                            Save to Favorites
                        </Button>
                    </View>
                </Card.Content>
            </Card>
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
    card: {
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    headerInfo: {
        flex: 1,
        marginRight: 8,
    },
    partName: {
        marginBottom: 4,
    },
    partBrand: {
        opacity: 0.7,
    },
    inStockChip: {
        backgroundColor: '#e8f5e9',
    },
    outOfStockChip: {
        backgroundColor: '#ffebee',
    },
    priceContainer: {
        marginBottom: 16,
    },
    price: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    categoryChip: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    compatibleChip: {
        backgroundColor: '#e8f5e9',
        marginBottom: 8,
    },
    incompatibleChip: {
        backgroundColor: '#ffebee',
        marginBottom: 8,
    },
    compatibilityReason: {
        marginTop: 4,
        opacity: 0.7,
    },
    buttonContainer: {
        marginTop: 8,
        gap: 12,
    },
    actionButton: {
        marginBottom: 8,
    },
})
