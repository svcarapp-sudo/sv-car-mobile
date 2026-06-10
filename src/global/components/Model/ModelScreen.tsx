import {useEffect, useMemo, useState} from 'react'
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {matchesSearch} from '@/global/utils'
import type {ModelApi} from '../../services/catalogService'
import {ListSearchBar} from '../listSearchBar'
import {Skeleton} from '../skeleton'
import {ModelCard} from './ModelCard'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (makeName: string) => `لسيارة ${makeName}`,
    SEARCH_PLACEHOLDER: 'ابحث عن الموديل...',
}

interface ModelScreenProps {
    makeId: number | null
    makeName: string
    getModels: (makeId: number) => Promise<ModelApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string) => void
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    contentTopInset?: number
}

export const ModelScreen = ({
    makeId,
    makeName,
    getModels,
    value: _value,
    valueId,
    onSelect,
    onNext,
    onScroll,
    hideHeader,
    contentTopInset = 0,
}: ModelScreenProps) => {
    const theme = useAppTheme()
    const [models, setModels] = useState<ModelApi[]>([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (makeId == null) {
            setModels([])
            return
        }

        let cancelled = false
        setLoading(true)
        getModels(makeId)
            .then(list => {
                if (!cancelled) setModels(list)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [makeId, getModels])

    const filtered = useMemo(() => models.filter(model => matchesSearch(query, model.name)), [models, query])

    const handleSelect = (model: ModelApi) => {
        onSelect(model.name, model.id)
        onNext()
    }

    if (loading && models.length === 0) {
        return (
            <View style={[styles.listContent, {paddingTop: contentTopInset}]}>
                {[0, 1, 2, 3, 4, 5].map(row => (
                    <View key={row} style={[styles.skeletonRow, {backgroundColor: theme.colors.surface}]}>
                        <Skeleton width={38} circle />
                        <Skeleton width='52%' height={14} radius={7} />
                    </View>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps='handled'
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        {!hideHeader && (
                            <View>
                                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                                    {ARABIC_TEXT.SELECT_MODEL}
                                </Text>
                                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                                    {ARABIC_TEXT.FOR_MAKE(makeName)}
                                </Text>
                            </View>
                        )}
                        <ListSearchBar value={query} onChangeText={setQuery} placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER} />
                    </View>
                }
                renderItem={({item}) => <ModelCard item={item} isSelected={valueId === item.id} onPress={handleSelect} />}
                contentContainerStyle={[styles.listContent, {paddingTop: contentTopInset}]}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    listHeader: {
        gap: 14,
        marginBottom: 16,
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
    skeletonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 8,
    },
})
