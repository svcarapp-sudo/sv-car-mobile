import {useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity, FlatList, Image} from 'react-native'
import {Text, useTheme, ActivityIndicator, Icon} from 'react-native-paper'

import type {MakeApi} from '../services/catalogService'

const AMBER = '#F59E0B'

const ARABIC_TEXT = {
    SELECT_MANUFACTURER: 'اختر الشركة المصنعة',
    LOADING: 'جاري تحميل الماركات...',
}

interface ManufacturerScreenProps {
    originId: number | null
    getMakes: (originId?: number | null) => Promise<MakeApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string, logoUrl?: string | null) => void
    onNext: () => void
}

export const ManufacturerScreen = ({
    originId,
    getMakes,
    value: _value,
    valueId,
    onSelect,
    onNext,
}: ManufacturerScreenProps) => {
    const theme = useTheme()
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

    const renderManufacturerItem = ({item}: {item: MakeApi}) => {
        const isSelected = valueId === item.id
        const logoUrl = item.logoUrl ?? null

        return (
            <TouchableOpacity onPress={() => handleSelect(item)} activeOpacity={0.7} style={styles.gridItem}>
                <View
                    style={[
                        styles.card,
                        {backgroundColor: theme.colors.surface},
                        isSelected && styles.cardSelected,
                    ]}>
                    {isSelected && (
                        <View style={styles.selectedBadge}>
                            <View style={styles.selectedBadgeCircle}>
                                <Icon source='check' size={9} color='#FFFFFF' />
                            </View>
                        </View>
                    )}
                    <View style={[styles.logoContainer, isSelected && styles.logoContainerSelected]}>
                        {logoUrl ? <Image source={{uri: logoUrl}} style={styles.logo} resizeMode='contain' /> : null}
                    </View>
                    <Text
                        variant='labelMedium'
                        numberOfLines={1}
                        style={[
                            styles.brandName,
                            {color: theme.colors.onSurface},
                            isSelected && {fontWeight: '700'},
                        ]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading && makes.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={AMBER} />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
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
                        <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.SELECT_MANUFACTURER}
                        </Text>
                    </View>
                }
                renderItem={({item: section}) => (
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text variant='titleSmall' style={[styles.sectionTitle, {color: theme.colors.onSurfaceVariant}]}>
                                {section.title}
                            </Text>
                        </View>
                        <View style={styles.gridRow}>
                            {section.data.map(item => (
                                <View key={item.id} style={styles.gridItemContainer}>
                                    {renderManufacturerItem({item})}
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
        backgroundColor: AMBER,
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
    gridItem: {
        margin: 5,
    },
    card: {
        borderRadius: 14,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderWidth: 1.5,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    cardSelected: {
        borderColor: AMBER,
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        shadowColor: AMBER,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedBadge: {
        position: 'absolute',
        top: 6,
        start: 6,
        zIndex: 1,
    },
    selectedBadgeCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: AMBER,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F8FAFC',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    logoContainerSelected: {
        borderColor: AMBER,
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
    },
    logo: {
        width: 38,
        height: 38,
    },
    brandName: {
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
