import React, {useEffect, useRef} from 'react'
import {StyleSheet, View, TouchableOpacity, Animated, I18nManager} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

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
            {/* Progress bar */}
            <View style={[styles.progressTrack, {backgroundColor: theme.colors.primaryContainer}]}>
                <View style={[styles.progressFill, {width: `${progressPercent}%`}]} />
            </View>

            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isActive = index === currentStep
                    const isClickable = isCompleted
                    const stepValue = index as Step
                    const iconSource = isCompleted ? 'check' : step.icon
                    const needsFlip = !isCompleted && I18nManager.isRTL && DIRECTIONAL_ICONS.has(step.icon)

                    const iconColor = isCompleted
                        ? theme.colors.onPrimary
                        : isActive
                          ? theme.colors.onPrimary
                          : theme.colors.onSurfaceVariant
                    const iconSize = isActive ? 16 : 13

                    const iconElement = (
                        <View style={needsFlip ? styles.flippedIcon : undefined}>
                            <Icon source={iconSource} size={iconSize} color={iconColor} />
                        </View>
                    )

                    const dotContent = (
                        <View style={styles.stepColumn}>
                            <Animated.View
                                style={[
                                    styles.stepDot,
                                    isCompleted && [styles.stepCompleted, {backgroundColor: theme.colors.primary}],
                                    isActive && {transform: [{scale: scaleAnim}]},
                                    isActive && styles.stepActive,
                                    !isCompleted && !isActive && [styles.stepInactive, {borderColor: theme.colors.outline}],
                                ]}>
                                {iconElement}
                            </Animated.View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    {color: theme.colors.onSurfaceVariant},
                                    isActive && [styles.stepLabelActive, {color: theme.colors.tertiary}],
                                    isCompleted && [styles.stepLabelCompleted, {color: theme.colors.primary}],
                                ]}
                                numberOfLines={1}>
                                {step.label}
                            </Text>
                        </View>
                    )

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <View
                                    style={[
                                        styles.connector,
                                        {backgroundColor: theme.colors.outline},
                                        index <= currentStep && {backgroundColor: theme.colors.primary},
                                    ]}
                                />
                            )}
                            {isClickable ? (
                                <TouchableOpacity
                                    onPress={() => onStepPress?.(stepValue)}
                                    activeOpacity={0.6}
                                    hitSlop={{top: 8, bottom: 8, left: 4, right: 4}}>
                                    {dotContent}
                                </TouchableOpacity>
                            ) : (
                                dotContent
                            )}
                        </React.Fragment>
                    )
                })}
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
    connector: {
        flex: 1,
        height: 2,
        borderRadius: 1,
        marginTop: 16,
        marginHorizontal: -2,
    },
    stepColumn: {
        alignItems: 'center',
        width: 46,
    },
    stepDot: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCompleted: {
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    stepActive: {
        backgroundColor: themeColors.tertiary,
        shadowColor: themeColors.tertiary,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
    },
    stepInactive: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
    },
    stepLabel: {
        fontSize: 9,
        fontWeight: '500',
        marginTop: 6,
        textAlign: 'center',
    },
    stepLabelActive: {
        fontWeight: '700',
        fontSize: 10,
    },
    stepLabelCompleted: {
        fontWeight: '600',
    },
    flippedIcon: {
        transform: [{scaleX: -1}],
    },
})
