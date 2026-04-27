import React from 'react'
import {Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {AddPartSummaryCard} from './AddPartSummaryCard'
import {Step} from './AddPartStepper'

interface AddPartScrollHeaderProps {
    currentStep: Step
    makeName: string
    makeLogoUrl?: string | null
    modelName: string
    year: number | null
    categoryName: string
    onEditSummary: () => void
    onLayout: (event: LayoutChangeEvent) => void
    translateY: Animated.AnimatedInterpolation<number>
    opacity: Animated.AnimatedInterpolation<number>
}

const TITLES: Record<Step, string> = {
    [Step.Make]: 'اختر الشركة المصنعة',
    [Step.Model]: 'اختر الموديل',
    [Step.Year]: 'سنة الصنع',
    [Step.Category]: 'اختر فئة القطعة',
    [Step.Details]: 'تفاصيل القطعة',
}

const subtitleFor = (step: Step, makeName: string): string | undefined => {
    if (step === Step.Model) return makeName ? `لسيارة ${makeName}` : undefined
    if (step === Step.Year) return 'اختر سنة صنع المركبة'
    if (step === Step.Details) return 'أخبرنا عن القطعة التي ترغب بإضافتها إلى متجرك'
    return undefined
}

export const AddPartScrollHeader = ({
    currentStep,
    makeName,
    makeLogoUrl,
    modelName,
    year,
    categoryName,
    onEditSummary,
    onLayout,
    translateY,
    opacity,
}: AddPartScrollHeaderProps) => {
    const theme = useAppTheme()
    const subtitle = subtitleFor(currentStep, makeName)

    return (
        <Animated.View
            onLayout={onLayout}
            style={[styles.container, {backgroundColor: theme.colors.background, transform: [{translateY}], opacity}]}>
            <AddPartSummaryCard
                makeName={makeName}
                makeLogoUrl={makeLogoUrl}
                modelName={modelName}
                year={year}
                categoryName={categoryName}
                onEdit={onEditSummary}
            />
            <View style={styles.titleWrap}>
                <Text variant='headlineSmall' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {TITLES[currentStep]}
                </Text>
                {subtitle && (
                    <Text variant='bodyMedium' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, paddingHorizontal: 16, paddingTop: 16},
    titleWrap: {marginTop: 4},
    title: {fontWeight: '700', marginBottom: 4},
    subtitle: {opacity: 0.6, fontSize: 14},
})
