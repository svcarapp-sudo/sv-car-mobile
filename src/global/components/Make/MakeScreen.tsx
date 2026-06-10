import {useEffect, useMemo, useState} from 'react'
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native'

import {matchesSearch} from '@/global/utils'
import type {MakeApi} from '../../services/catalogService'
import {Skeleton} from '../skeleton'
import {MakeList, type MakeSection} from './MakeList'

const ARABIC_TEXT = {
    OTHER_ORIGIN: 'أخرى',
}

interface MakeScreenProps {
    originId: number | null
    getMakes: (originId?: number | null) => Promise<MakeApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string, logoUrl?: string | null) => void
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    contentTopInset?: number
}

export const MakeScreen = ({
    originId,
    getMakes,
    value: _value,
    valueId,
    onSelect,
    onNext,
    onScroll,
    hideHeader,
    contentTopInset = 0,
}: MakeScreenProps) => {
    const [makes, setMakes] = useState<MakeApi[]>([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        getMakes(originId ?? undefined)
            .then((list: MakeApi[]) => {
                if (!cancelled) setMakes(list)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [originId, getMakes])

    const sections = useMemo<MakeSection[]>(() => {
        const grouped = makes.reduce<Record<string, MakeApi[]>>((acc, curr) => {
            if (!matchesSearch(query, curr.name)) return acc
            const country = curr.originCountry ?? ARABIC_TEXT.OTHER_ORIGIN
            if (!acc[country]) acc[country] = []
            acc[country].push(curr)
            return acc
        }, {})

        return Object.keys(grouped).map(title => ({title, data: grouped[title]}))
    }, [makes, query])

    const handleSelect = (make: MakeApi) => {
        onSelect(make.name, make.id, make.logoUrl ?? undefined)
        onNext()
    }

    if (loading && makes.length === 0) {
        return (
            <View style={[styles.skeletonList, {paddingTop: contentTopInset}]}>
                {[0, 1, 2, 3, 4, 5].map(row => (
                    <View key={row} style={styles.skeletonRow}>
                        <Skeleton width={44} circle />
                        <Skeleton width='58%' height={14} radius={7} />
                    </View>
                ))}
            </View>
        )
    }

    return (
        <MakeList
            sections={sections}
            valueId={valueId}
            query={query}
            onQueryChange={setQuery}
            onSelect={handleSelect}
            onScroll={onScroll}
            hideHeader={hideHeader}
            contentTopInset={contentTopInset}
        />
    )
}

const styles = StyleSheet.create({
    skeletonList: {
        paddingBottom: 24,
    },
    skeletonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
})
