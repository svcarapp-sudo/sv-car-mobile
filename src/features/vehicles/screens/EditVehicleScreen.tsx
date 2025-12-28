import {useState} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {TextInput, Button, Text, Card} from 'react-native-paper'

import type {RootStackParamList} from '@/core/navigation/types'
import {CURRENT_YEAR, MIN_YEAR, MAX_YEAR} from '@/shared/constants'

import {useVehicles} from '../hooks'

import type {NavigationProp, RouteProp} from '@react-navigation/native'

interface EditVehicleScreenProps {
    route?: RouteProp<RootStackParamList, 'EditVehicle'>
    navigation?: NavigationProp<RootStackParamList>
}

export const EditVehicleScreen: React.FC<EditVehicleScreenProps> = ({route, navigation}) => {
    const {getVehicleById, updateVehicle} = useVehicles()
    const vehicleId = route?.params?.vehicleId

    const vehicle = vehicleId ? getVehicleById(vehicleId) : null

    // Initialize state from vehicle data
    const getInitialState = () => ({
        make: vehicle?.make || '',
        model: vehicle?.model || '',
        year: vehicle?.year ? String(vehicle.year) : String(CURRENT_YEAR),
        engine: vehicle?.engine || '',
        trim: vehicle?.trim || '',
        displayName: vehicle?.displayName || '',
    })

    const [make, setMake] = useState(() => getInitialState().make)
    const [model, setModel] = useState(() => getInitialState().model)
    const [year, setYear] = useState(() => getInitialState().year)
    const [engine, setEngine] = useState(() => getInitialState().engine)
    const [trim, setTrim] = useState(() => getInitialState().trim)
    const [displayName, setDisplayName] = useState(() => getInitialState().displayName)
    const [errors, setErrors] = useState<Record<string, string>>({})

    if (!vehicle) {
        return (
            <View style={styles.container}>
                <Text variant='headlineSmall'>Vehicle not found</Text>
            </View>
        )
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!make.trim()) {
            newErrors.make = 'Make is required'
        }

        if (!model.trim()) {
            newErrors.model = 'Model is required'
        }

        if (!year.trim()) {
            newErrors.year = 'Year is required'
        } else {
            const yearNum = parseInt(year, 10)

            if (isNaN(yearNum) || yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
                newErrors.year = `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`
            }
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm() || !vehicleId) {
            return
        }

        updateVehicle(vehicleId, {
            make: make.trim(),
            model: model.trim(),
            year: parseInt(year, 10),
            engine: engine.trim() || undefined,
            trim: trim.trim() || undefined,
            displayName: displayName.trim() || undefined,
        })

        navigation?.goBack()
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant='headlineSmall' style={styles.title}>
                        Edit Vehicle
                    </Text>

                    <TextInput
                        label='Make *'
                        value={make}
                        onChangeText={setMake}
                        error={Boolean(errors.make)}
                        mode='outlined'
                        style={styles.input}
                    />
                    {errors.make && <Text style={styles.error}>{errors.make}</Text>}

                    <TextInput
                        label='Model *'
                        value={model}
                        onChangeText={setModel}
                        error={Boolean(errors.model)}
                        mode='outlined'
                        style={styles.input}
                    />
                    {errors.model && <Text style={styles.error}>{errors.model}</Text>}

                    <TextInput
                        label='Year *'
                        value={year}
                        onChangeText={setYear}
                        error={Boolean(errors.year)}
                        mode='outlined'
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    {errors.year && <Text style={styles.error}>{errors.year}</Text>}

                    <TextInput
                        label='Engine / Displacement (Optional)'
                        value={engine}
                        onChangeText={setEngine}
                        mode='outlined'
                        style={styles.input}
                        placeholder='e.g., 2.4L, V6 3.5L'
                    />

                    <TextInput
                        label='Trim (Optional)'
                        value={trim}
                        onChangeText={setTrim}
                        mode='outlined'
                        style={styles.input}
                        placeholder='e.g., LE, EX, Limited'
                    />

                    <TextInput
                        label='Display Name (Optional)'
                        value={displayName}
                        onChangeText={setDisplayName}
                        mode='outlined'
                        style={styles.input}
                        placeholder='Custom name for this vehicle'
                    />

                    <Button mode='contained' onPress={handleSubmit} style={styles.submitButton}>
                        Save Changes
                    </Button>

                    <Button mode='outlined' onPress={() => navigation?.goBack()} style={styles.cancelButton}>
                        Cancel
                    </Button>
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
    title: {
        marginBottom: 24,
    },
    input: {
        marginBottom: 8,
    },
    error: {
        color: '#b00020',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 16,
    },
    submitButton: {
        marginTop: 16,
    },
    cancelButton: {
        marginTop: 8,
    },
})
