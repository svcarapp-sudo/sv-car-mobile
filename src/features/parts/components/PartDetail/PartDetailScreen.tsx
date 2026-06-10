import {useCallback, useEffect, useRef, useState} from 'react'
import {Animated, ScrollView, StyleSheet, View} from 'react-native'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {showToast} from '@/global/components'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {ApiError} from '@/global/services'
import {useSavedPartsStore} from '@/global/store'
import type {Part} from '@/global/types'

import {usePartApi} from '../../hooks'
import {partsListService} from '../../services'
import {PartDetailActions} from './PartDetailActions'
import {PartDetailCompatibility} from './PartDetailCompatibility'
import {PartDetailDescription} from './PartDetailDescription'
import {PartDetailFallback} from './PartDetailFallback'
import {PartDetailHero} from './PartDetailHero'
import {PartDetailInfo} from './PartDetailInfo'
import {PartDetailSeller} from './PartDetailSeller'
import {PartDetailSkeleton} from './PartDetailSkeleton'
import {PartDetailSpecs} from './PartDetailSpecs'

const ARABIC_TEXT = {
    SAVE_ERROR: 'تعذر تحديث المفضلة',
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
    const [failed, setFailed] = useState(false)
    const fadeIn = useRef(new Animated.Value(0)).current
    const saved = useSavedPartsStore(s => (part ? s.ids.includes(part.id) : false))
    const toggleSaved = useSavedPartsStore(s => s.toggle)

    const fetchPart = useCallback(() => {
        if (!partId) {
            setLoading(false)
            return
        }
        setLoading(true)
        setFailed(false)
        getPartById(partId)
            .then(setPart)
            .catch(err => setFailed(!(err instanceof ApiError && err.status === 404)))
            .finally(() => setLoading(false))
    }, [partId, getPartById])

    useEffect(() => {
        fetchPart()
        if (partId) void partsListService.recordView(partId).catch(() => undefined)
    }, [fetchPart, partId])

    useEffect(() => {
        if (!loading && part) {
            Animated.timing(fadeIn, {toValue: 1, duration: 350, useNativeDriver: true}).start()
        }
    }, [loading, part, fadeIn])

    const goBack = () => navigation?.goBack()
    const goBrowse = () => navigation?.navigate('PartsList', {category: null})

    if (loading) {
        return (
            <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
                <PartDetailSkeleton />
            </View>
        )
    }

    if (failed || !part) {
        return <PartDetailFallback kind={failed ? 'error' : 'notFound'} onBack={goBack} onBrowse={goBrowse} onRetry={fetchPart} />
    }

    const categoryInfo = getBySlug(part.category)

    return (
        <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
            <Animated.View style={[styles.root, {opacity: fadeIn}]}>
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    <PartDetailHero part={part} categoryInfo={categoryInfo} onBack={goBack} />

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
                isSaved={saved}
                onSave={() => {
                    void toggleSaved(part.id).catch(() => showToast(ARABIC_TEXT.SAVE_ERROR, 'error'))
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1},
    scroll: {paddingBottom: 110},
    content: {paddingHorizontal: 16, gap: 12, marginTop: 0},
})
