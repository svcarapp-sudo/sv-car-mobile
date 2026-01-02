import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Card, IconButton, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

const ARABIC_TEXT = {
    FUEL_TYPE: 'نوع الوقود',
    SELECT_FUEL: 'اختر نوع الوقود',
}

interface FuelScreenProps {
    value: string
    onSelect: (fuelType: string) => void
    onNext: () => void
}

export const FuelScreen = ({value, onSelect, onNext}: FuelScreenProps) => {
    const {fuelTypes} = useVehicleInfo()
    const theme = useTheme()

    const handleSelect = (fuelType: string) => {
        onSelect(fuelType)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.FUEL_TYPE}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.SELECT_FUEL}
                </Text>
            </View>
            <View style={styles.fuelContainer}>
                {fuelTypes.map(f => {
                    const isSelected = value === f.name

                    return (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => handleSelect(f.name)}
                            style={styles.fuelCardWrapper}
                            activeOpacity={0.7}>
                            <Card
                                style={[
                                    styles.fuelCard,
                                    {
                                        backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
                                        borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                                        elevation: isSelected ? 4 : 1,
                                    },
                                ]}
                                mode={isSelected ? 'contained' : 'outlined'}>
                                <Card.Content style={styles.fuelCardContent}>
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            {
                                                backgroundColor: isSelected ? theme.colors.surface : theme.colors.surfaceVariant,
                                            },
                                        ]}>
                                        <IconButton
                                            icon={f.icon}
                                            size={28}
                                            iconColor={isSelected ? theme.colors.primary : theme.colors.onSurfaceVariant}
                                            style={styles.iconButton}
                                        />
                                    </View>
                                    <Text
                                        variant='titleMedium'
                                        style={[
                                            styles.fuelName,
                                            {
                                                color: isSelected ? theme.colors.primary : theme.colors.onSurface,
                                                fontWeight: isSelected ? 'bold' : '600',
                                            },
                                        ]}>
                                        {f.name}
                                    </Text>
                                    {isSelected && (
                                        <IconButton
                                            icon='check-circle'
                                            size={20}
                                            iconColor={theme.colors.primary}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 24,
    },
    stepTitle: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    stepSubtitle: {
        opacity: 0.7,
    },
    fuelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    fuelCardWrapper: {
        width: '48%',
        padding: 6,
    },
    fuelCard: {
        borderRadius: 16,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    fuelCardContent: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 12,
        position: 'relative',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconButton: {
        margin: 0,
    },
    fuelName: {
        textAlign: 'center',
    },
    checkIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        margin: 0,
        width: 24,
        height: 24,
    },
})
