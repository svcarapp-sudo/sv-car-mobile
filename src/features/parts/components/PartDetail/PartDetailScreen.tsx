import {useState, useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'
import type {Part, CompatibilityResponse} from '@/global/types'
import {useAppTheme, usePartCategories} from '@/global/hooks'
import {usePartApi} from '../../hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {RouteProp} from '@react-navigation/native'
import {PartDetailHero} from './PartDetailHero'
import {PartDetailCompat} from './PartDetailCompat'
import {PartDetailActions} from './PartDetailActions'
import {PartDetailDescription} from './PartDetailDescription'

const ARABIC_TEXT = {
    LOADING: 'جاري التحميل...',
    NOT_FOUND: 'لم يتم العثور على القطعة',
    SKU: 'الرمز',
}

interface PartDetailScreenProps {
    route?: RouteProp<RootStackParamList, 'PartDetail'>
}

export const PartDetailScreen = ({route}: PartDetailScreenProps) => {
    const partId = route?.params?.partId
    const {getPartById, checkCompatibility} = usePartApi()
    const {getBySlug} = usePartCategories()
    const theme = useAppTheme()
    const [part, setPart] = useState<Part | null>(null)
    const [compatibility, setCompatibility] = useState<CompatibilityResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const fadeIn = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const fetchPart = async () => {
            if (!partId) {
                return
            }

            setLoading(true)
            try {
                const fetchedPart = await getPartById(partId)
                setPart(fetchedPart)

                if (fetchedPart) {
                    try {
                        const compat = await checkCompatibility(partId)
                        setCompatibility(compat)
                    } catch (error) {
                        console.error('Failed to check compatibility:', error)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch part:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partId])

    useEffect(() => {
        if (!loading && part) {
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true,
            }).start()
        }
    }, [loading, part, fadeIn])

    if (loading) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
                <Text style={[styles.loadingLabel, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.LOADING}</Text>
            </View>
        )
    }

    if (!part) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <View style={[styles.notFoundIcon, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='package-variant-closed-remove' size={40} color={theme.colors.primary} />
                </View>
                <Text style={[styles.notFoundText, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.NOT_FOUND}</Text>
            </View>
        )
    }

    const categoryInfo = getBySlug(part.category)

    return (
        <Animated.View style={[styles.root, {backgroundColor: theme.colors.background, opacity: fadeIn}]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <PartDetailHero part={part} categoryInfo={categoryInfo} />

                <View style={[styles.priceCard, {backgroundColor: theme.colors.accentContainer}]}>
                    <View style={styles.priceInner}>
                        <Text style={[styles.priceCurrency, {color: theme.colors.tertiary}]}>$</Text>
                        <Text style={[styles.priceValue, {color: theme.colors.tertiary}]}>{part.price.toFixed(2)}</Text>
                    </View>
                    {part.sku && (
                        <Text style={[styles.skuText, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.SKU}: {part.sku}
                        </Text>
                    )}
                </View>

                {part.description && <PartDetailDescription description={part.description} />}
                {compatibility && <PartDetailCompat compatibility={compatibility} />}
                <PartDetailActions inStock={part.inStock} />
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scroll: {
        padding: 16,
        paddingBottom: 32,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    loadingLabel: {
        marginTop: 16,
        fontSize: 14,
        letterSpacing: 0.1,
    },
    notFoundIcon: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    notFoundText: {
        fontSize: 16,
        fontWeight: '600',
    },
    priceCard: {
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    priceInner: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    priceCurrency: {
        fontSize: 16,
        fontWeight: '500',
        opacity: 0.7,
    },
    priceValue: {
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    skuText: {
        fontSize: 12,
        letterSpacing: 0.2,
        opacity: 0.6,
    },
})
