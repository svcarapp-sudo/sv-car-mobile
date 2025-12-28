import {ScrollView, StyleSheet, View} from 'react-native'

import {Card, Text, Button, FAB, IconButton} from 'react-native-paper'

import type {RootStackParamList} from '@/core/navigation/types'
import type {Vehicle} from '@/shared/types'

import {useVehicles} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

interface VehicleListScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const VehicleListScreen: React.FC<VehicleListScreenProps> = ({navigation}) => {
    const {vehicles, selectedVehicle, selectVehicle, deleteVehicle} = useVehicles()

    const handleSelectVehicle = (vehicle: Vehicle) => {
        selectVehicle(vehicle.id)
        navigation?.navigate('PartsCategories')
    }

    const handleAddVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleEditVehicle = (vehicle: Vehicle) => {
        navigation?.navigate('EditVehicle', {vehicleId: vehicle.id})
    }

    const handleDeleteVehicle = (vehicleId: string) => {
        deleteVehicle(vehicleId)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                {vehicles.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text variant='headlineSmall' style={styles.emptyTitle}>
                            No vehicles yet
                        </Text>
                        <Text variant='bodyMedium' style={styles.emptyText}>
                            Add your first vehicle to start browsing compatible parts
                        </Text>
                        <Button mode='contained' onPress={handleAddVehicle} style={styles.addButton}>
                            Add Vehicle
                        </Button>
                    </View>
                ) : (
                    <>
                        <Text variant='headlineMedium' style={styles.title}>
                            Your Vehicles
                        </Text>
                        {vehicles.map(vehicle => (
                            <Card
                                key={vehicle.id}
                                style={[styles.card, selectedVehicle?.id === vehicle.id && styles.selectedCard]}
                                onPress={() => handleSelectVehicle(vehicle)}>
                                <Card.Content>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardContent}>
                                            <Text variant='titleLarge'>{vehicle.displayName || vehicle.make}</Text>
                                            <Text variant='bodyMedium' style={styles.cardSubtitle}>
                                                {vehicle.make} {vehicle.model} • {vehicle.year}
                                            </Text>
                                            {vehicle.engine && (
                                                <Text variant='bodySmall' style={styles.cardDetail}>
                                                    Engine: {vehicle.engine}
                                                </Text>
                                            )}
                                            {vehicle.trim && (
                                                <Text variant='bodySmall' style={styles.cardDetail}>
                                                    Trim: {vehicle.trim}
                                                </Text>
                                            )}
                                        </View>
                                        {selectedVehicle?.id === vehicle.id && (
                                            <Text variant='labelSmall' style={styles.selectedBadge}>
                                                SELECTED
                                            </Text>
                                        )}
                                    </View>
                                </Card.Content>
                                <Card.Actions>
                                    <Button onPress={() => handleSelectVehicle(vehicle)}>
                                        {selectedVehicle?.id === vehicle.id ? 'Browse Parts' : 'Select'}
                                    </Button>
                                    <IconButton icon='pencil' size={20} onPress={() => handleEditVehicle(vehicle)} />
                                    <IconButton icon='delete' size={20} onPress={() => handleDeleteVehicle(vehicle.id)} />
                                </Card.Actions>
                            </Card>
                        ))}
                    </>
                )}
            </ScrollView>
            {vehicles.length > 0 && <FAB icon='plus' style={styles.fab} onPress={handleAddVehicle} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 64,
    },
    emptyTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginBottom: 24,
        opacity: 0.7,
    },
    addButton: {
        marginTop: 16,
    },
    card: {
        marginBottom: 12,
        elevation: 2,
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: '#6200ee',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardContent: {
        flex: 1,
    },
    cardSubtitle: {
        marginTop: 4,
        opacity: 0.7,
    },
    cardDetail: {
        marginTop: 4,
        opacity: 0.6,
    },
    selectedBadge: {
        color: '#6200ee',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
