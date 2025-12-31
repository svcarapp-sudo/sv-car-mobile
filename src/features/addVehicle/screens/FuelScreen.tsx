import {StyleSheet, View} from 'react-native'
import {Text, Card, IconButton, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

const ARABIC_TEXT = {
    FUEL_TYPE: 'نوع الوقود',
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
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.FUEL_TYPE}
            </Text>
            <View style={styles.fuelContainer}>
                {fuelTypes.map(f => (
                    <Card
                        key={f.id}
                        style={[
                            styles.fuelCard,
                            {backgroundColor: theme.colors.surface},
                            value === f.name && {backgroundColor: theme.colors.primaryContainer},
                        ]}
                        onPress={() => handleSelect(f.name)}>
                        <Card.Content style={styles.fuelCardContent}>
                            <IconButton
                                icon={f.icon}
                                size={32}
                                iconColor={value === f.name ? theme.colors.primary : theme.colors.primary}
                                style={value === f.name && {backgroundColor: theme.colors.surface}}
                            />
                            <Text
                                variant='titleMedium'
                                style={{
                                    color: value === f.name ? theme.colors.primary : theme.colors.onSurface,
                                    fontWeight: value === f.name ? 'bold' : 'normal',
                                }}>
                                {f.name}
                            </Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    fuelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    fuelCard: {
        width: '48%',
        marginBottom: 12,
        borderRadius: 16,
    },
    fuelCardContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
})
