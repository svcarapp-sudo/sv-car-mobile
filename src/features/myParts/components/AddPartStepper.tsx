import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'

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
        <View style={[styles.container, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.surfaceVariant}]}>
            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    const isClickable = isCompleted
                    const stepVal = index as Step

                    const dotColor = isActive
                        ? theme.colors.primary
                        : isCompleted
                          ? theme.colors.primary
                          : theme.colors.surfaceVariant
                    const textColor = isActive
                        ? theme.colors.primary
                        : isCompleted
                          ? theme.colors.onSurfaceVariant
                          : theme.colors.outline

                    const Wrapper = isClickable ? TouchableOpacity : View
                    const wrapperProps = isClickable
                        ? {onPress: () => onStepPress?.(stepVal), activeOpacity: 0.6}
                        : {}

                    return (
                        <Wrapper key={step.label} style={styles.stepItem} {...wrapperProps}>
                            <View
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor: dotColor,
                                        borderColor: isActive ? theme.colors.primary : 'transparent',
                                    },
                                ]}>
                                {isCompleted ? (
                                    <Icon source="check" size={14} color={theme.colors.onPrimary} />
                                ) : (
                                    <Icon
                                        source={step.icon}
                                        size={14}
                                        color={isActive ? theme.colors.onPrimary : theme.colors.outline}
                                    />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.label,
                                    {color: textColor, fontWeight: isActive ? '700' : '400'},
                                ]}
                                numberOfLines={1}>
                                {step.label}
                            </Text>
                        </Wrapper>
                    )
                })}
            </View>

            {/* Progress track */}
            <View style={[styles.progressTrack, {backgroundColor: theme.colors.surfaceVariant}]}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            backgroundColor: theme.colors.primary,
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
        paddingTop: 14,
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    stepsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
        gap: 4,
    },
    dot: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 10,
        textAlign: 'center',
    },
    progressTrack: {
        height: 4,
        marginHorizontal: 16,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
})
