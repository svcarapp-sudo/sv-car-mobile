import {useEffect, useState} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {Text, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {ModelApi} from '../../services/catalogService'

import {ModelCard} from './ModelCard'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (makeName: string) => `لسيارة ${makeName}`,
    LOADING: 'جاري تحميل الموديلات...',
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

export const ModelScreen = ({makeId, makeName, getModels, value: _value, valueId, onSelect, onNext}: ModelScreenProps) => {
    const theme = useAppTheme()
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
                <ActivityIndicator size='large' color={theme.colors.tertiary} />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SELECT_MODEL}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.FOR_MAKE(makeName)}
                </Text>
            </View>
            <FlatList
                data={models}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ModelCard item={item} isSelected={valueId === item.id} onPress={handleSelect} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 20,
    },
    stepTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    stepSubtitle: {
        opacity: 0.6,
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 24,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
