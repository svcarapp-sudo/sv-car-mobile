import {useEffect, useState} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, List, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (make: string) => `لسيارة ${make}`,
}

interface ModelScreenProps {
    make: string
    value: string
    onSelect: (model: string) => void
    onNext: () => void
}

export const ModelScreen = ({make, value, onSelect, onNext}: ModelScreenProps) => {
    const {getModels} = useVehicleInfo()
    const theme = useTheme()
    const [models, setModels] = useState<string[]>([])

    useEffect(() => {
        const fetchModels = async () => {
            if (make) {
                const fetchedModels = await getModels(make)
                setModels(fetchedModels)
            }
        }
        fetchModels()
    }, [make, getModels])

    const handleSelect = (model: string) => {
        onSelect(model)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.SELECT_MODEL}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.FOR_MAKE(make)}
            </Text>
            <ScrollView style={styles.listContainer}>
                {models.map(m => (
                    <List.Item
                        key={m}
                        title={m}
                        titleStyle={{fontWeight: value === m ? 'bold' : 'normal'}}
                        left={props => (
                            <List.Icon
                                {...props}
                                icon={value === m ? 'check-circle' : 'car-side'}
                                color={value === m ? theme.colors.primary : theme.colors.outline}
                            />
                        )}
                        onPress={() => handleSelect(m)}
                        style={[
                            styles.listItem,
                            {backgroundColor: theme.colors.surface},
                            value === m && {
                                backgroundColor: theme.colors.primaryContainer,
                                borderColor: theme.colors.primary,
                                borderWidth: 1,
                            },
                        ]}
                    />
                ))}
            </ScrollView>
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
    stepSubtitle: {
        marginBottom: 24,
        opacity: 0.7,
    },
    listContainer: {
        flex: 1,
    },
    listItem: {
        borderRadius: 12,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: 'transparent',
    },
})
