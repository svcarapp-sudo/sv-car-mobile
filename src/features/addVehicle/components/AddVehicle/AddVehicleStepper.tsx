import {useEffect, useRef} from 'react'
import {StyleSheet, View, Animated} from 'react-native'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

import {StepIndicator} from './StepIndicator'

const STEPS_INFO = [
    {label: 'المنشأ', icon: 'earth'},
    {label: 'الماركة', icon: 'car-side'},
    {label: 'الموديل', icon: 'car-info'},
    {label: 'السنة', icon: 'calendar-range'},
    {label: 'الوقود', icon: 'gas-station'},
    {label: 'التفاصيل', icon: 'card-text-outline'},
]

export enum Step {
    Origin = 0,
    Make = 1,
    Model = 2,
    Year = 3,
    Fuel = 4,
    Details = 5,
}

interface AddVehicleStepperProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

export const AddVehicleStepper = ({currentStep, onStepPress}: AddVehicleStepperProps) => {
    const theme = useAppTheme()
    const scaleAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        scaleAnim.setValue(0.85)
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 180,
            friction: 12,
        }).start()
    }, [currentStep, scaleAnim])

    const progressPercent = (currentStep / (STEPS_INFO.length - 1)) * 100

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outline}]}>
            <View style={[styles.progressTrack, {backgroundColor: theme.colors.primaryContainer}]}>
                <View style={[styles.progressFill, {width: `${progressPercent}%`}]} />
            </View>

            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => (
                    <StepIndicator
                        key={index}
                        index={index}
                        icon={step.icon}
                        label={step.label}
                        currentStep={currentStep}
                        scaleAnim={scaleAnim}
                        onStepPress={onStepPress}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    progressTrack: {
        height: 3,
        marginHorizontal: 20,
        borderRadius: 1.5,
        marginBottom: 18,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: themeColors.tertiary,
        borderRadius: 1.5,
    },
    stepsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
})
