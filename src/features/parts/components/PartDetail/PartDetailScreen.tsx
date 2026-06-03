import {useEffect, useRef, useState} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {useSavedPartsStore} from '@/global/store'
import type {Part} from '@/global/types'

import {usePartApi} from '../../hooks'
import {partsListService} from '../../services'
import {PartDetailActions} from './PartDetailActions'
import {PartDetailCompatibility} from './PartDetailCompatibility'
import {PartDetailDescription} from './PartDetailDescription'
import {PartDetailHero} from './PartDetailHero'
import {PartDetailInfo} from './PartDetailInfo'
import {PartDetailSeller} from './PartDetailSeller'
import {PartDetailSpecs} from './PartDetailSpecs'

const ARABIC_TEXT = {
    LOADING: 'جاري التحميل...',
    NOT_FOUND: 'لم يتم العثور على القطعة',
}

interface PartDetailScreenProps {
    route?: RouteProp<RootStackParamList, 'PartDetail'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartDetailScreen = ({route, navigation}: PartDetailScreenProps) => {
    const partId = route?.params?.partId
    const {getPartById} = usePartApi()
    const {getBySlug} = useCatalog()
    const theme = useAppTheme()
    const [part, setPart] = useState<Part | null>(null)
    const [loading, setLoading] = useState(true)
    const fadeIn = useRef(new Animated.Value(0)).current
    const saved = useSavedPartsStore(s => (part ? s.ids.includes(part.id) : false))
    const toggleSaved = useSavedPartsStore(s => s.toggle)

    useEffect(() => {
        if (!partId) return
        setLoading(true)
        getPartById(partId)
            .then(setPart)
            .catch(err => console.error('Failed to fetch part:', err))
            .finally(() => setLoading(false))
        void partsListService.recordView(partId).catch(() => undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partId])

    useEffect(() => {
        if (!loading && part) {
            Animated.timing(fadeIn, {toValue: 1, duration: 350, useNativeDriver: true}).start()
        }
    }, [loading, part, fadeIn])

    if (loading) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.tertiary} />
                <Text style={[styles.loadingLabel, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.LOADING}</Text>
            </View>
        )
    }

    if (!part) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <View style={[styles.notFoundIcon, {backgroundColor: theme.colors.accentSubtle}]}>
                    <Icon source='package-variant-closed-remove' size={40} color={theme.colors.tertiary} />
                </View>
                <Text style={[styles.notFoundText, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.NOT_FOUND}</Text>
            </View>
        )
    }

    const categoryInfo = getBySlug(part.category)

    return (
        <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
            <Animated.View style={[styles.root, {opacity: fadeIn}]}>
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    <PartDetailHero part={part} categoryInfo={categoryInfo} onBack={() => navigation?.goBack()} />

                    <View style={styles.content}>
                        <PartDetailInfo part={part} />
                        <PartDetailCompatibility vehicles={part.compatibleVehicles} />
                        <PartDetailSeller part={part} />
                        {part.description && <PartDetailDescription description={part.description} />}
                        <PartDetailSpecs part={part} categoryInfo={categoryInfo} />
                    </View>
                </ScrollView>
            </Animated.View>

            <PartDetailActions
                price={part.price}
                inStock={part.inStock}
                isSaved={saved}
                onContact={() => {}}
                onSave={() => {
                    void toggleSaved(part.id).catch(() => undefined)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1},
    scroll: {paddingBottom: 110},
    content: {paddingHorizontal: 16, gap: 12, marginTop: 0},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32},
    loadingLabel: {marginTop: 16, fontSize: 14, letterSpacing: 0.1},
    notFoundIcon: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    notFoundText: {fontSize: 16, fontWeight: '700'},
})
