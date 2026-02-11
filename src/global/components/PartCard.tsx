import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Card, Text, Chip, useTheme} from 'react-native-paper'
import type {Part} from '@/global/types'
import type {PartCategoryApi} from '@/global/types'

const ARABIC_TEXT = {
    MAKE: 'الماركة',
    MODEL: 'الموديل',
    YEAR: 'السنة',
    SKU_LABEL: 'الرمز:',
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
}

interface PartCardProps {
    part: Part
    makeInfo?: {name: string; logoUrl?: string | null} | null
    modelInfo?: {name: string} | null
    categoryInfo?: PartCategoryApi | null
    onPress?: () => void
    showActions?: boolean
    onEdit?: () => void
    onDelete?: () => void
    showStockStatus?: boolean
}

export const PartCard = ({
    part,
    makeInfo,
    modelInfo,
    categoryInfo,
    onPress,
    showActions = false,
    onEdit,
    onDelete,
    showStockStatus = false,
}: PartCardProps) => {
    const theme = useTheme()

    const cardContent = (
        <Card.Content>
            <View style={styles.partHeader}>
                {part.imageUrl && (
                    <Image source={{uri: part.imageUrl}} style={styles.partImage} resizeMode='cover' />
                )}
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
                {showStockStatus && (
                    <>
                        {part.inStock ? (
                            <Chip
                                icon='check-circle'
                                style={[styles.inStockChip, {backgroundColor: '#E8F5E9'}]}
                                textStyle={{color: '#2E7D32'}}
                                compact>
                                {ARABIC_TEXT.IN_STOCK}
                            </Chip>
                        ) : (
                            <Chip
                                icon='alert-circle'
                                style={[styles.outOfStockChip, {backgroundColor: '#FFEBEE'}]}
                                textStyle={{color: '#C62828'}}
                                compact>
                                {ARABIC_TEXT.OUT_OF_STOCK}
                            </Chip>
                        )}
                    </>
                )}
            </View>

            {(makeInfo || modelInfo || part.year) && (
                <View style={styles.vehicleInfo}>
                    {makeInfo && (
                        <View style={styles.vehicleItem}>
                            {makeInfo.logoUrl && (
                                <Image source={{uri: makeInfo.logoUrl}} style={styles.makeLogo} resizeMode='contain' />
                            )}
                            <Text variant='bodySmall' style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                                {ARABIC_TEXT.MAKE}: {makeInfo.name}
                            </Text>
                        </View>
                    )}
                    {modelInfo && (
                        <Text variant='bodySmall' style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.MODEL}: {modelInfo.name}
                        </Text>
                    )}
                    {part.year && (
                        <Text variant='bodySmall' style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.YEAR}: {part.year}
                        </Text>
                    )}
                </View>
            )}

            {part.description && (
                <Text
                    variant='bodyMedium'
                    style={[styles.partDescription, {color: theme.colors.onSurfaceVariant}]}
                    numberOfLines={3}>
                    {part.description}
                </Text>
            )}

            <View style={styles.partFooter}>
                <View style={styles.priceSection}>
                    <Text variant='titleLarge' style={[styles.partPrice, {color: theme.colors.tertiary}]}>
                        ${part.price.toFixed(2)}
                    </Text>
                    {part.sku && (
                        <Text variant='bodySmall' style={[styles.partSku, {color: theme.colors.outline}]}>
                            {ARABIC_TEXT.SKU_LABEL} {part.sku}
                        </Text>
                    )}
                </View>
                {categoryInfo && (
                    <Chip
                        icon={categoryInfo.icon || 'tag'}
                        style={[styles.categoryChip, {backgroundColor: theme.colors.secondaryContainer}]}
                        compact>
                        {categoryInfo.name}
                    </Chip>
                )}
            </View>
        </Card.Content>
    )

    if (onPress) {
        return (
            <Card
                style={[styles.partCard, {backgroundColor: theme.colors.surface}]}
                onPress={onPress}>
                {cardContent}
            </Card>
        )
    }

    return <Card style={[styles.partCard, {backgroundColor: theme.colors.surface}]}>{cardContent}</Card>
}

const styles = StyleSheet.create({
    partCard: {
        marginBottom: 12,
        elevation: 2,
        borderRadius: 12,
    },
    partHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    partImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginEnd: 12,
        backgroundColor: '#f5f5f5',
    },
    partInfo: {
        flex: 1,
        marginEnd: 8,
    },
    partName: {
        marginBottom: 4,
        fontWeight: 'bold',
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
    vehicleInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 12,
    },
    makeLogo: {
        width: 20,
        height: 20,
        marginEnd: 6,
    },
    vehicleText: {
        opacity: 0.8,
    },
    partDescription: {
        marginBottom: 12,
        opacity: 0.7,
        lineHeight: 20,
    },
    partFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    priceSection: {
        flex: 1,
    },
    partPrice: {
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 4,
    },
    partSku: {
        opacity: 0.5,
    },
    categoryChip: {
        marginStart: 8,
    },
})
