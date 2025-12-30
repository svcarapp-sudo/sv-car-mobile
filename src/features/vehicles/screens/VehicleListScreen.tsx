import {ScrollView, StyleSheet, View} from 'react-native'

import {Card, Text, Button, IconButton, useTheme} from 'react-native-paper'

import type {RootStackParamList} from '@/shared/navigation/types'

import {useVehicles} from '../hooks'

import type {NavigationProp} from '@react-navigation/native'

interface VehicleListScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const VehicleListScreen = ({navigation}: VehicleListScreenProps) => {
    const {vehicle, removeVehicle} = useVehicles()
    const theme = useTheme()

    const handleBrowseParts = () => {
        navigation?.navigate('PartsCategories')
    }

    const handleAddVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleChangeVehicle = () => {
        navigation?.navigate('AddVehicle')
    }

    const handleRemoveVehicle = () => {
        removeVehicle()
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                {!vehicle ? (
                    <View style={styles.emptyContainer}>
                        <IconButton icon='car-outline' size={64} iconColor={theme.colors.primary} />
                        <Text variant='headlineSmall' style={styles.emptyTitle}>
                            No vehicle added
                        </Text>
                        <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                            Add your vehicle to find compatible parts and manage your car information
                        </Text>
                        <Button mode='contained' onPress={handleAddVehicle} style={styles.addButton}>
                            Add My Vehicle
                        </Button>
                    </View>
                ) : (
                    <>
                        <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.onBackground}]}>
                            My Vehicle
                        </Text>
                        <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                            <Card.Content>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardContent}>
                                        <Text variant='titleLarge' style={{color: theme.colors.primary}}>
                                            {vehicle.displayName || vehicle.make}
                                        </Text>
                                        <Text
                                            variant='bodyMedium'
                                            style={[styles.cardSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                                            {vehicle.make} {vehicle.model} • {vehicle.year}
                                        </Text>
                                        <View style={[styles.detailsGrid, {borderTopColor: theme.colors.outline}]}>
                                            <View style={styles.detailItem}>
                                                <Text
                                                    variant='labelSmall'
                                                    style={[styles.detailLabel, {color: theme.colors.onSurfaceVariant}]}>
                                                    FUEL
                                                </Text>
                                                <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>
                                                    {vehicle.fuelType || 'N/A'}
                                                </Text>
                                            </View>
                                            <View style={styles.detailItem}>
                                                <Text
                                                    variant='labelSmall'
                                                    style={[styles.detailLabel, {color: theme.colors.onSurfaceVariant}]}>
                                                    ENGINE
                                                </Text>
                                                <Text variant='bodyMedium' style={{color: theme.colors.onSurface}}>
                                                    {vehicle.engine || 'N/A'}
                                                </Text>
                                            </View>
                                        </View>
                                        {vehicle.vin && (
                                            <View style={styles.vinContainer}>
                                                <Text
                                                    variant='labelSmall'
                                                    style={[styles.detailLabel, {color: theme.colors.onSurfaceVariant}]}>
                                                    VIN
                                                </Text>
                                                <Text variant='bodySmall' style={{color: theme.colors.onSurface}}>
                                                    {vehicle.vin}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </Card.Content>
                            <Card.Actions style={styles.cardActions}>
                                <Button mode='contained' onPress={handleBrowseParts} style={styles.browseButton}>
                                    Browse Parts
                                </Button>
                                <View style={styles.secondaryActions}>
                                    <Button mode='outlined' onPress={handleChangeVehicle} style={styles.actionButton}>
                                        Change
                                    </Button>
                                    <Button
                                        mode='text'
                                        onPress={handleRemoveVehicle}
                                        textColor={theme.colors.error}
                                        style={styles.actionButton}>
                                        Remove
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card>

                        <View style={[styles.infoBox, {backgroundColor: theme.colors.secondaryContainer}]}>
                            <IconButton icon='information-outline' size={20} iconColor={theme.colors.primary} />
                            <Text variant='bodySmall' style={[styles.infoText, {color: theme.colors.onSecondaryContainer}]}>
                                We are showing results and information specifically for your {vehicle.make} {vehicle.model}.
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>
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
        marginBottom: 20,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    emptyTitle: {
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    addButton: {
        paddingHorizontal: 16,
    },
    card: {
        marginBottom: 24,
        elevation: 4,
        borderRadius: 12,
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
        marginBottom: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        marginTop: 8,
        borderTopWidth: 1,
        paddingTop: 16,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        marginBottom: 2,
    },
    vinContainer: {
        marginTop: 16,
    },
    cardActions: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 16,
        gap: 12,
    },
    browseButton: {
        width: '100%',
    },
    secondaryActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    actionButton: {
        flex: 1,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingRight: 16,
    },
    infoText: {
        flex: 1,
    },
})
