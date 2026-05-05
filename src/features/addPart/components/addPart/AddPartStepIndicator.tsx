import React from 'react'
import {Animated, I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

import type {Step} from './AddPartStepper'

const DIRECTIONAL_ICONS = new Set(['car-info'])

interface AddPartStepIndicatorProps {
    index: number
    icon: string
    label: string
    currentStep: Step
    scaleAnim: Animated.Value
    onStepPress?: (step: Step) => void
}

export const AddPartStepIndicator = ({index, icon, label, currentStep, scaleAnim, onStepPress}: AddPartStepIndicatorProps) => {
    const theme = useAppTheme()
    const isCompleted = index < currentStep
    const isActive = index === currentStep
    const isClickable = isCompleted
    const stepValue = index as Step
    const iconSource = isCompleted ? 'check' : icon
    const needsFlip = !isCompleted && I18nManager.isRTL && DIRECTIONAL_ICONS.has(icon)

    const iconColor = isCompleted || isActive ? theme.colors.onPrimary : theme.colors.onSurfaceVariant
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
                {label}
            </Text>
        </View>
    )

    return (
        <>
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
        </>
    )
}

const styles = StyleSheet.create({
    connector: {flex: 1, height: 2, borderRadius: 1, marginTop: 16, marginHorizontal: -2},
    stepColumn: {alignItems: 'center', width: 52},
    stepDot: {width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center'},
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
    stepInactive: {backgroundColor: 'transparent', borderWidth: 1.5},
    stepLabel: {fontSize: 9, fontWeight: '500', marginTop: 6, textAlign: 'center'},
    stepLabelActive: {fontWeight: '700', fontSize: 10},
    stepLabelCompleted: {fontWeight: '600'},
    flippedIcon: {transform: [{scaleX: -1}]},
})
