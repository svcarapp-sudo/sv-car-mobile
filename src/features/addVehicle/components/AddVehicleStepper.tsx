import React, {useEffect, useRef} from 'react'
import {StyleSheet, View, TouchableOpacity, Animated, I18nManager} from 'react-native'
import {Text, useTheme, Icon} from 'react-native-paper'

const DIRECTIONAL_ICONS = new Set(['car-side', 'car-info'])

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
    Manufacturer = 1,
    Model = 2,
    Year = 3,
    Fuel = 4,
    Details = 5,
}

interface AddVehicleStepperProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

const AMBER = '#F59E0B'
const DARK = '#1E293B'

export const AddVehicleStepper = ({currentStep, onStepPress}: AddVehicleStepperProps) => {
    const theme = useTheme()
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

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isActive = index === currentStep
                    const isClickable = isCompleted
                    const stepValue = index as Step
                    const iconSource = isCompleted ? 'check' : step.icon
                    const needsFlip = !isCompleted && I18nManager.isRTL && DIRECTIONAL_ICONS.has(step.icon)

                    const iconElement = (
                        <View style={needsFlip ? styles.flippedIcon : undefined}>
                            <Icon
                                source={iconSource}
                                size={13}
                                color={isCompleted || isActive ? '#FFFFFF' : '#94A3B8'}
                            />
                        </View>
                    )

                    const dotView = (
                        <Animated.View
                            style={[
                                styles.stepDot,
                                isCompleted && styles.stepCompleted,
                                isActive && styles.stepActive,
                                !isCompleted && !isActive && styles.stepInactive,
                                isActive && {transform: [{scale: scaleAnim}]},
                            ]}>
                            {iconElement}
                        </Animated.View>
                    )

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <View
                                    style={[
                                        styles.connector,
                                        {
                                            backgroundColor: index <= currentStep ? DARK : theme.colors.outline,
                                        },
                                    ]}
                                />
                            )}
                            {isClickable ? (
                                <TouchableOpacity
                                    onPress={() => onStepPress?.(stepValue)}
                                    activeOpacity={0.7}
                                    hitSlop={{top: 10, bottom: 10, left: 6, right: 6}}>
                                    {dotView}
                                </TouchableOpacity>
                            ) : (
                                dotView
                            )}
                        </React.Fragment>
                    )
                })}
            </View>

            <Text style={styles.currentLabel}>{STEPS_INFO[currentStep].label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.08)',
    },
    stepsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 14,
    },
    connector: {
        flex: 1,
        height: 2,
        borderRadius: 1,
    },
    stepDot: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCompleted: {
        backgroundColor: DARK,
    },
    stepActive: {
        backgroundColor: AMBER,
        shadowColor: AMBER,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
    },
    stepInactive: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
    },
    currentLabel: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '700',
        color: AMBER,
        letterSpacing: 0.3,
    },
    flippedIcon: {
        transform: [{scaleX: -1}],
    },
})
