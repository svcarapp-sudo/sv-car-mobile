import {Animated, LayoutChangeEvent, StyleSheet} from 'react-native'

import {useAppTheme} from '@/global/hooks'

import {AddPartPreview} from './AddPartPreview'
import {StepHeader} from './StepHeader'
import type {Step} from './addPartConstants'

interface AddPartScrollHeaderProps {
    currentStep: Step
    title: string
    subtitle: string
    showTitle: boolean
    makeName: string
    makeLogoUrl?: string | null
    modelName: string
    yearLabel: string
    categoryName: string
    onStepPress: (step: Step) => void
    onLayout: (event: LayoutChangeEvent) => void
    translateY: Animated.AnimatedInterpolation<number>
    opacity: Animated.AnimatedInterpolation<number>
}

export const AddPartScrollHeader = ({
    currentStep,
    title,
    subtitle,
    showTitle,
    makeName,
    makeLogoUrl,
    modelName,
    yearLabel,
    categoryName,
    onStepPress,
    onLayout,
    translateY,
    opacity,
}: AddPartScrollHeaderProps) => {
    const theme = useAppTheme()

    return (
        <Animated.View
            onLayout={onLayout}
            style={[styles.container, {backgroundColor: theme.colors.background, transform: [{translateY}], opacity}]}>
            <AddPartPreview
                currentStep={currentStep}
                makeName={makeName}
                makeLogoUrl={makeLogoUrl}
                modelName={modelName}
                yearLabel={yearLabel}
                categoryName={categoryName}
                onStepPress={onStepPress}
            />
            {showTitle ? <StepHeader title={title} subtitle={subtitle} /> : null}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
})
