import {useState, useEffect, useRef} from 'react'
import {Animated, ScrollView, StyleSheet, View, Image} from 'react-native'
import {ActivityIndicator, Button, Icon, Text, useTheme} from 'react-native-paper'
import type {Part, CompatibilityResponse} from '@/global/types'
import {usePartCategories} from '@/global/hooks'
import {usePartApi} from '../hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {RouteProp} from '@react-navigation/native'

const ARABIC_TEXT = {
    LOADING: 'جاري التحميل...',
    NOT_FOUND: 'لم يتم العثور على القطعة',
    IN_STOCK: 'متوفر',
    OUT_OF_STOCK: 'غير متوفر',
    DESCRIPTION: 'الوصف',
    SKU: 'الرمز',
    COMPATIBILITY: 'التوافق',
    PERFECT_MATCH: 'مطابقة تماماً',
    COMPATIBLE: 'متوافقة',
    NOT_COMPATIBLE: 'غير متوافقة',
    ADD_TO_CART: 'أضف إلى السلة',
    SAVE_TO_FAVORITES: 'إضافة إلى المفضلة',
    BRAND: 'الماركة',
}

interface PartDetailScreenProps {
    route?: RouteProp<RootStackParamList, 'PartDetail'>
}

export const PartDetailScreen = ({route}: PartDetailScreenProps) => {
    const partId = route?.params?.partId
    const {getPartById, checkCompatibility} = usePartApi()
    const {getBySlug} = usePartCategories()
    const theme = useTheme()
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

                // Check compatibility - backend automatically uses user's selected vehicle
                if (fetchedPart) {
                    try {
                        const compat = await checkCompatibility(partId)
                        setCompatibility(compat)
                    } catch (error) {
                        // Compatibility check failed, but we still show the part
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
                {/* Hero section */}
                <View style={[styles.heroCard, {backgroundColor: theme.colors.surface}]}>
                    {/* Image / Icon fallback */}
                    {part.imageUrl ? (
                        <Image source={{uri: part.imageUrl}} style={styles.heroImage} resizeMode='cover' />
                    ) : (
                        <View style={[styles.heroIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                            <Icon source={categoryInfo?.icon || 'package-variant'} size={56} color={theme.colors.primary} />
                        </View>
                    )}

                    {/* Name + Brand + Stock */}
                    <View style={styles.heroInfo}>
                        <Text style={[styles.partName, {color: theme.colors.onSurface}]}>{part.name}</Text>
                        {part.brand && (
                            <Text style={[styles.partBrand, {color: theme.colors.onSurfaceVariant}]}>{part.brand}</Text>
                        )}
                        <View style={styles.metaRow}>
                            {/* Stock badge */}
                            <View style={[styles.stockBadge, {backgroundColor: part.inStock ? '#F0FDF4' : '#FEF2F2'}]}>
                                <View style={[styles.stockDot, {backgroundColor: part.inStock ? '#22C55E' : '#EF4444'}]} />
                                <Text style={[styles.stockLabel, {color: part.inStock ? '#16A34A' : '#DC2626'}]}>
                                    {part.inStock ? ARABIC_TEXT.IN_STOCK : ARABIC_TEXT.OUT_OF_STOCK}
                                </Text>
                            </View>
                            {/* Category pill */}
                            {categoryInfo && (
                                <View style={[styles.categoryPill, {backgroundColor: theme.colors.primaryContainer}]}>
                                    <Icon source={categoryInfo.icon || 'tag'} size={13} color={theme.colors.primary} />
                                    <Text style={[styles.categoryPillText, {color: theme.colors.primary}]}>
                                        {categoryInfo.name}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Price card */}
                <View style={[styles.priceCard, {backgroundColor: '#FFF7ED'}]}>
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

                {/* Description section */}
                {part.description && (
                    <View style={[styles.sectionCard, {backgroundColor: theme.colors.surface}]}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                                <Icon source='text-box-outline' size={16} color={theme.colors.primary} />
                            </View>
                            <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.DESCRIPTION}</Text>
                        </View>
                        <Text style={[styles.sectionBody, {color: theme.colors.onSurfaceVariant}]}>{part.description}</Text>
                    </View>
                )}

                {/* Compatibility section */}
                {compatibility && (
                    <View style={[styles.sectionCard, {backgroundColor: theme.colors.surface}]}>
                        <View style={styles.sectionHeader}>
                            <View
                                style={[
                                    styles.sectionIconBox,
                                    {
                                        backgroundColor: compatibility.isCompatible ? '#F0FDF4' : '#FEF2F2',
                                    },
                                ]}>
                                <Icon
                                    source={compatibility.isCompatible ? 'check-circle-outline' : 'close-circle-outline'}
                                    size={16}
                                    color={compatibility.isCompatible ? '#16A34A' : '#DC2626'}
                                />
                            </View>
                            <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                                {ARABIC_TEXT.COMPATIBILITY}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.compatBadge,
                                {
                                    backgroundColor: compatibility.isCompatible ? '#F0FDF4' : '#FEF2F2',
                                },
                            ]}>
                            <Icon
                                source={compatibility.isCompatible ? 'check-circle' : 'close-circle'}
                                size={18}
                                color={compatibility.isCompatible ? '#16A34A' : '#DC2626'}
                            />
                            <Text style={[styles.compatText, {color: compatibility.isCompatible ? '#16A34A' : '#DC2626'}]}>
                                {(() => {
                                    if (compatibility.isCompatible && compatibility.exactMatch) {
                                        return ARABIC_TEXT.PERFECT_MATCH
                                    }

                                    if (compatibility.isCompatible) {
                                        return ARABIC_TEXT.COMPATIBLE
                                    }

                                    return ARABIC_TEXT.NOT_COMPATIBLE
                                })()}
                            </Text>
                        </View>
                        {compatibility.reason && (
                            <Text style={[styles.compatReason, {color: theme.colors.onSurfaceVariant}]}>
                                {compatibility.reason}
                            </Text>
                        )}
                    </View>
                )}

                {/* Action buttons */}
                <View style={styles.actions}>
                    <Button
                        mode='contained'
                        icon='cart-outline'
                        onPress={() => {}}
                        disabled={!part.inStock}
                        style={styles.primaryAction}
                        contentStyle={styles.actionContent}
                        labelStyle={styles.actionLabel}
                        buttonColor={theme.colors.tertiary}
                        textColor='#000'>
                        {ARABIC_TEXT.ADD_TO_CART}
                    </Button>
                    <Button
                        mode='outlined'
                        icon='heart-outline'
                        onPress={() => {}}
                        style={[styles.secondaryAction, {borderColor: theme.colors.outline}]}
                        contentStyle={styles.actionContent}
                        labelStyle={[styles.actionLabel, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.SAVE_TO_FAVORITES}
                    </Button>
                </View>
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

    // Hero
    heroCard: {
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 12,
    },
    heroImage: {
        width: 96,
        height: 96,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        marginEnd: 16,
    },
    heroIconBox: {
        width: 96,
        height: 96,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 16,
    },
    heroInfo: {
        flex: 1,
    },
    partName: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 26,
        marginBottom: 4,
    },
    partBrand: {
        fontSize: 13,
        letterSpacing: 0.1,
        opacity: 0.7,
        marginBottom: 10,
    },
    metaRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    stockBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    stockDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    stockLabel: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    categoryPillText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.2,
    },

    // Price
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

    // Sections
    sectionCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },
    sectionIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.1,
    },
    sectionBody: {
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: 0.1,
    },

    // Compatibility
    compatBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        marginBottom: 8,
    },
    compatText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
    compatReason: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.7,
        marginTop: 4,
    },

    // Actions
    actions: {
        gap: 10,
        marginTop: 8,
    },
    primaryAction: {
        borderRadius: 16,
    },
    secondaryAction: {
        borderRadius: 16,
        borderWidth: 1.5,
    },
    actionContent: {
        paddingVertical: 10,
    },
    actionLabel: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
})
