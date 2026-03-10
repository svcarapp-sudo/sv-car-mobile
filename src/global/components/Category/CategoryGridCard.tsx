import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Card, IconButton, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {PartCategoryApi} from '@/global/types'

interface CategoryGridCardProps {
    category: PartCategoryApi
    isSelected: boolean
    onPress: (category: PartCategoryApi) => void
}

export const CategoryGridCard = ({category, isSelected, onPress}: CategoryGridCardProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity
            onPress={() => onPress(category)}
            activeOpacity={0.7}
            style={styles.cardWrapper}>
            <Card
                style={[
                    styles.card,
                    {
                        backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                        borderWidth: isSelected ? 2 : 1,
                    },
                ]}>
                <View style={styles.cardInner}>
                    <Card.Content style={styles.cardContent}>
                        <View
                            style={[
                                styles.iconContainer,
                                {
                                    backgroundColor: isSelected
                                        ? theme.colors.primary
                                        : theme.colors.primaryContainer,
                                },
                            ]}>
                            <IconButton
                                icon={category.icon || 'package-variant'}
                                size={28}
                                iconColor={isSelected ? theme.colors.onPrimary : theme.colors.onPrimaryContainer}
                                style={styles.icon}
                            />
                        </View>
                        <Text
                            variant='labelLarge'
                            style={[
                                styles.categoryName,
                                {
                                    color: isSelected ? theme.colors.primary : theme.colors.onSurface,
                                    fontWeight: isSelected ? 'bold' : '500',
                                },
                            ]}
                            numberOfLines={2}>
                            {category.name}
                        </Text>
                    </Card.Content>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '33.333%',
        padding: 4,
    },
    card: {
        borderRadius: 16,
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 0.5,
    },
    cardInner: {
        overflow: 'hidden',
        borderRadius: 16,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        minHeight: 120,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        margin: 0,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
})
