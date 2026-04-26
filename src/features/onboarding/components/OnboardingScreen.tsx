import React, {useCallback, useRef, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import type {RootStackParamList} from '@/global/navigation/types'
import {ONBOARDING_SLIDES, type OnboardingSlideData} from '../constants/slides'
import {OnboardingSlide} from './OnboardingSlide'
import {OnboardingPagination} from './OnboardingPagination'

interface OnboardingScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>
}

export const OnboardingScreen = ({navigation}: OnboardingScreenProps) => {
    const theme = useAppTheme()
    const completeOnboarding = useAuthStore(s => s.completeOnboarding)
    const [activeIndex, setActiveIndex] = useState(0)
    const flatListRef = useRef<FlatList<OnboardingSlideData>>(null)

    const handleDone = useCallback(() => {
        completeOnboarding()
        navigation.replace('Login')
    }, [completeOnboarding, navigation])

    const handleNext = useCallback(() => {
        if (activeIndex === ONBOARDING_SLIDES.length - 1) {
            handleDone()
        } else {
            flatListRef.current?.scrollToIndex({index: activeIndex + 1, animated: true})
        }
    }, [activeIndex, handleDone])

    const onViewableItemsChanged = useRef(({viewableItems}: {viewableItems: {index: number | null}[]}) => {
        if (viewableItems[0]?.index != null) {
            setActiveIndex(viewableItems[0].index)
        }
    }).current

    const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                ref={flatListRef}
                data={ONBOARDING_SLIDES}
                renderItem={({item}) => <OnboardingSlide slide={item} />}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={styles.listContent}
            />
            <OnboardingPagination
                total={ONBOARDING_SLIDES.length}
                activeIndex={activeIndex}
                isLast={activeIndex === ONBOARDING_SLIDES.length - 1}
                onNext={handleNext}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {alignItems: 'center'},
})
