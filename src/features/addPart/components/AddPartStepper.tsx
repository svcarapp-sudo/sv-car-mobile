import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

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

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    const isClickable = isCompleted
                    const stepVal = index as Step

                    const Wrapper = isClickable ? TouchableOpacity : View
                    const wrapperProps = isClickable
                        ? {onPress: () => onStepPress?.(stepVal), activeOpacity: 0.6}
                        : {}

                    return (
                        <Wrapper key={step.label} style={styles.stepItem} {...wrapperProps}>
                            <View
                                style={[
                                    styles.dot,
                                    isActive && [styles.dotActive, {borderColor: theme.colors.tertiary}],
                                    isCompleted && {backgroundColor: theme.colors.tertiary},
                                    !isActive && !isCompleted && {backgroundColor: themeColors.onDarkSurface},
                                ]}>
                                {isCompleted ? (
                                    <Icon source='check' size={13} color={themeColors.onPrimary} />
                                ) : (
                                    <Icon
                                        source={step.icon}
                                        size={13}
                                        color={isActive ? themeColors.onPrimary : themeColors.onDarkMuted}
                                    />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: isActive
                                            ? themeColors.onPrimary
                                            : isCompleted
                                              ? themeColors.onDarkHigh
                                              : themeColors.onDarkMuted,
                                        fontWeight: isActive ? '700' : '400',
                                    },
                                ]}
                                numberOfLines={1}>
                                {step.label}
                            </Text>
                        </Wrapper>
                    )
                })}
            </View>

            {/* Progress bar */}
            <View style={[styles.progressTrack, {backgroundColor: themeColors.onDarkSurface}]}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            backgroundColor: theme.colors.tertiary,
                            width: `${((currentStep + 1) / STEPS_INFO.length) * 100}%`,
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingBottom: 10,
    },
    stepsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
        gap: 4,
    },
    dot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotActive: {
        backgroundColor: themeColors.onDarkOverlay,
        borderWidth: 2,
    },
    label: {
        fontSize: 10,
        textAlign: 'center',
    },
    progressTrack: {
        height: 3,
        marginHorizontal: 16,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
})
