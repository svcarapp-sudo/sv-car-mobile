import React, {useCallback, useRef, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import {haptics} from '@/global/utils'
import type {RootStackParamList} from '@/global/navigation/types'
import {ONBOARDING_SLIDES, type OnboardingSlideData} from '../constants/slides'
import {OnboardingSlide} from './OnboardingSlide'
import {OnboardingPagination} from './OnboardingPagination'

const ARABIC_TEXT = {
    SKIP: 'تخطي',
}

interface OnboardingScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>
}

export const OnboardingScreen = ({navigation}: OnboardingScreenProps) => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const completeOnboarding = useAuthStore(s => s.completeOnboarding)
    const [activeIndex, setActiveIndex] = useState(0)
    const flatListRef = useRef<FlatList<OnboardingSlideData>>(null)
    const lastIndexRef = useRef(0)

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
        const index = viewableItems[0]?.index
        if (index != null) {
            if (index !== lastIndexRef.current) {
                lastIndexRef.current = index
                haptics.selection()
            }
            setActiveIndex(index)
        }
    }).current

    const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current
    const isLast = activeIndex === ONBOARDING_SLIDES.length - 1

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
            {!isLast && (
                <Button
                    mode='text'
                    compact
                    onPress={handleDone}
                    accessibilityRole='button'
                    textColor={theme.colors.onSurfaceVariant}
                    style={[styles.skip, {top: insets.top + 8}]}>
                    {ARABIC_TEXT.SKIP}
                </Button>
            )}
            <OnboardingPagination
                total={ONBOARDING_SLIDES.length}
                activeIndex={activeIndex}
                isLast={isLast}
                onNext={handleNext}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {alignItems: 'center'},
    skip: {position: 'absolute', end: 16, zIndex: 10},
})
