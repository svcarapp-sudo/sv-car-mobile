import {useEffect, useState} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, List, useTheme, ActivityIndicator} from 'react-native-paper'

import type {ModelApi} from '../services'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (makeName: string) => `لسيارة ${makeName}`,
}

interface ModelScreenProps {
    makeId: number | null
    makeName: string
    getModels: (makeId: number) => Promise<ModelApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string) => void
    onNext: () => void
}

export const ModelScreen = ({
    makeId,
    makeName,
    getModels,
    value: _value,
    valueId,
    onSelect,
    onNext,
}: ModelScreenProps) => {
    const theme = useTheme()
    const [models, setModels] = useState<ModelApi[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (makeId == null) {
            setModels([])

            return
        }

        let cancelled = false
        setLoading(true)
        getModels(makeId)
            .then(list => {
                if (!cancelled) {
                    setModels(list)
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
    }, [makeId, getModels])

    const handleSelect = (model: ModelApi) => {
        onSelect(model.name, model.id)
        onNext()
    }

    if (loading && models.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    جاري تحميل الموديلات...
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.SELECT_MODEL}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.FOR_MAKE(makeName)}
            </Text>
            <ScrollView style={styles.listContainer}>
                {models.map(m => {
                    const isSelected = valueId === m.id

                    return (
                        <List.Item
                            key={m.id}
                            title={m.name}
                            titleStyle={{fontWeight: isSelected ? 'bold' : 'normal'}}
                            left={props => (
                                <List.Icon
                                    {...props}
                                    icon={isSelected ? 'check-circle' : 'car-side'}
                                    color={isSelected ? theme.colors.primary : theme.colors.outline}
                                />
                            )}
                            onPress={() => handleSelect(m)}
                            style={[
                                styles.listItem,
                                {backgroundColor: theme.colors.surface},
                                isSelected && {
                                    backgroundColor: theme.colors.primaryContainer,
                                    borderColor: theme.colors.primary,
                                    borderWidth: 1,
                                },
                            ]}
                        />
                    )
                })}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
