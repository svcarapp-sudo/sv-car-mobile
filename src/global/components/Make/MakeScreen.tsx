import {useEffect, useState} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {Text, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {MakeApi} from '../../services/catalogService'
import {MakeCard} from './MakeCard'

const ARABIC_TEXT = {
    SELECT_MAKE: 'اختر الشركة المصنعة',
    LOADING: 'جاري تحميل الماركات...',
}

interface MakeScreenProps {
    originId: number | null
    getMakes: (originId?: number | null) => Promise<MakeApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string, logoUrl?: string | null) => void
    onNext: () => void
}

export const MakeScreen = ({
    originId,
    getMakes,
    value: _value,
    valueId,
    onSelect,
    onNext,
}: MakeScreenProps) => {
    const theme = useAppTheme()
    const [makes, setMakes] = useState<MakeApi[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let cancelled = false
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show loading while fetching
        setLoading(true)
        getMakes(originId ?? undefined)
            .then((list: MakeApi[]) => {
                if (!cancelled) {
                    setMakes(list)
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
    }, [originId, getMakes])

    const groupedMakes = makes.reduce<Record<string, MakeApi[]>>((acc, curr) => {
        const country = curr.originCountry ?? 'أخرى'

        if (!acc[country]) {
            acc[country] = []
        }

        acc[country].push(curr)

        return acc
    }, {})

    const sections = Object.keys(groupedMakes).map(title => ({title, data: groupedMakes[title]}))

    const handleSelect = (make: MakeApi) => {
        onSelect(make.name, make.id, make.logoUrl ?? undefined)
        onNext()
    }

    if (loading && makes.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={theme.colors.tertiary} />
                <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={sections}
                keyExtractor={item => item.title}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text variant="headlineSmall" style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.SELECT_MAKE}
                        </Text>
                    </View>
                }
                renderItem={({item: section}) => (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text variant="titleSmall" style={[styles.sectionTitle, {color: theme.colors.onSurfaceVariant}]}>
                                {section.title}
                            </Text>
                        </View>
                        <View style={styles.gridRow}>
                            {section.data.map(item => (
                                <View key={item.id} style={styles.gridItemContainer}>
                                    <MakeCard
                                        item={item}
                                        isSelected={valueId === item.id}
                                        onPress={handleSelect}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.gridContainer}
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
        width: '100%',
        marginBottom: 16,
    },
    stepTitle: {
        fontWeight: '700',
        width: '100%',
    },
    gridContainer: {
        paddingBottom: 24,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        paddingHorizontal: 4,
    },
    sectionDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: themeColors.tertiary,
        marginEnd: 8,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 13,
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItemContainer: {
        width: '33.33%',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
