import {useEffect, useRef} from 'react'
import {StyleSheet, View, Animated, TouchableOpacity, I18nManager} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {haptics} from '@/global/utils'

import {STEPS, TOTAL_STEPS, ARABIC_TEXT, type Step} from './addVehicleConstants'

interface AddVehicleProgressProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

export const AddVehicleProgress = ({currentStep, onStepPress}: AddVehicleProgressProps) => {
    const theme = useAppTheme()
    const stepMeta = STEPS[currentStep]
    const fillAnim = useRef(new Animated.Value(currentStep + 1)).current

    useEffect(() => {
        Animated.spring(fillAnim, {
            toValue: currentStep + 1,
            useNativeDriver: false,
            tension: 100,
            friction: 14,
        }).start()
    }, [currentStep, fillAnim])

    const handleStepPress = (step: Step) => {
        haptics.selection()
        onStepPress?.(step)
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outlineVariant}]}>
            <View style={styles.topRow}>
                <View style={[styles.counterChip, {backgroundColor: theme.colors.accentSoft}]}>
                    <Icon source={stepMeta.icon} size={12} color={theme.colors.tertiary} />
                    <Text style={[styles.counterText, {color: theme.colors.tertiary}]}>
                        {ARABIC_TEXT.STEP_OF(currentStep + 1, TOTAL_STEPS)}
                    </Text>
                </View>
                <Text style={[styles.stepName, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {stepMeta.label}
                </Text>
                <View style={styles.spacer} />
            </View>

            <View
                style={styles.segmentRow}
                accessibilityRole='progressbar'
                accessibilityValue={{min: 1, max: TOTAL_STEPS, now: currentStep + 1}}>
                {STEPS.map((s, index) => {
                    const isCompleted = index < currentStep
                    const isActive = index === currentStep
                    const tappable = isCompleted && onStepPress != null
                    let segmentColor = theme.colors.outlineVariant
                    if (isActive) segmentColor = theme.colors.tertiary
                    else if (isCompleted) segmentColor = theme.colors.primary

                    const segment = (
                        <Animated.View
                            style={[
                                styles.segment,
                                {backgroundColor: segmentColor},
                                isActive && {
                                    transform: [
                                        {
                                            scaleY: fillAnim.interpolate({
                                                inputRange: [index, index + 1],
                                                outputRange: [0.6, 1],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        />
                    )

                    return tappable ? (
                        <TouchableOpacity
                            key={s.step}
                            style={styles.segmentWrap}
                            onPress={() => handleStepPress(s.step)}
                            activeOpacity={0.6}
                            hitSlop={{top: 12, bottom: 12, left: 2, right: 2}}>
                            {segment}
                        </TouchableOpacity>
                    ) : (
                        <View key={s.step} style={styles.segmentWrap}>
                            {segment}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 14,
        paddingBottom: 16,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    counterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 999,
    },
    counterText: {
        fontSize: 11,
        fontWeight: '800',
    },
    stepName: {
        flex: 1,
        textAlign: I18nManager.isRTL ? 'left' : 'right',
        fontWeight: '700',
        fontSize: 14,
        marginHorizontal: 12,
    },
    spacer: {
        width: 0,
    },
    segmentRow: {
        flexDirection: 'row',
        gap: 6,
        height: 6,
    },
    segmentWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    segment: {
        height: 6,
        borderRadius: 3,
    },
})
