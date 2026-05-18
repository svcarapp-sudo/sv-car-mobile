import {Animated, LayoutChangeEvent, StyleSheet} from 'react-native'

import {useAppTheme} from '@/global/hooks'

import {AddVehiclePreview} from './AddVehiclePreview'
import {StepHeader} from './StepHeader'
import type {Step} from './addVehicleConstants'

interface AddVehicleScrollHeaderProps {
    currentStep: Step
    title: string
    subtitle: string
    originName: string
    make: string
    makeLogoUrl: string | null
    model: string
    year: string
    fuelType: string
    onStepPress: (step: Step) => void
    onLayout: (event: LayoutChangeEvent) => void
    translateY: Animated.AnimatedInterpolation<number>
    opacity: Animated.AnimatedInterpolation<number>
}

export const AddVehicleScrollHeader = ({
    currentStep,
    title,
    subtitle,
    originName,
    make,
    makeLogoUrl,
    model,
    year,
    fuelType,
    onStepPress,
    onLayout,
    translateY,
    opacity,
}: AddVehicleScrollHeaderProps) => {
    const theme = useAppTheme()

    return (
        <Animated.View
            onLayout={onLayout}
            style={[styles.container, {backgroundColor: theme.colors.background, transform: [{translateY}], opacity}]}>
            <AddVehiclePreview
                currentStep={currentStep}
                originName={originName}
                make={make}
                makeLogoUrl={makeLogoUrl}
                model={model}
                year={year}
                fuelType={fuelType}
                onStepPress={onStepPress}
            />
            <StepHeader title={title} subtitle={subtitle} />
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
        paddingHorizontal: 18,
        paddingTop: 16,
    },
})
