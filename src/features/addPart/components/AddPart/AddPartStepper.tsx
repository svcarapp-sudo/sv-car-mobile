import {useEffect, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

import {AddPartStepIndicator} from './AddPartStepIndicator'

const STEPS_INFO = [
    {label: 'الماركة', icon: 'car-outline'},
    {label: 'الموديل', icon: 'car-info'},
    {label: 'السنة', icon: 'calendar'},
    {label: 'الفئة', icon: 'shape'},
    {label: 'التفاصيل', icon: 'text-box-outline'},
]

export enum Step {
    Make = 0,
    Model = 1,
    Year = 2,
    Category = 3,
    Details = 4,
}

interface AddPartStepperProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

export const AddPartStepper = ({currentStep, onStepPress}: AddPartStepperProps) => {
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
                    <AddPartStepIndicator
                        key={step.label}
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
