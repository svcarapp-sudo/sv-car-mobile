import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {ProgressBar, Text, IconButton, useTheme} from 'react-native-paper'

const ARABIC_TEXT = {
    STEPS: {
        BRAND: 'الماركة',
        MODEL: 'الموديل',
        YEAR: 'السنة',
        FUEL: 'الوقود',
        VIN: 'رقم الهيكل',
    },
}

const STEPS_INFO = [
    {label: ARABIC_TEXT.STEPS.BRAND, icon: 'car-outline'},
    {label: ARABIC_TEXT.STEPS.MODEL, icon: 'car-info'},
    {label: ARABIC_TEXT.STEPS.YEAR, icon: 'calendar'},
    {label: ARABIC_TEXT.STEPS.FUEL, icon: 'gas-station'},
    {label: ARABIC_TEXT.STEPS.VIN, icon: 'numeric'},
]

export enum Step {
    Manufacturer = 0,
    Model = 1,
    Year = 2,
    Fuel = 3,
    Details = 4,
}

interface AddVehicleStepperProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

export const AddVehicleStepper = ({currentStep, onStepPress}: AddVehicleStepperProps) => {
    const theme = useTheme()
    const progress = (currentStep + 1) / STEPS_INFO.length

    return (
        <View style={[styles.stepperContainer, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outline}]}>
            <View style={styles.stepperHeader}>
                {STEPS_INFO.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    const isLast = index === STEPS_INFO.length - 1
                    const stepValue = index as Step
                    const isClickable = isCompleted || isActive

                    const handlePress = () => {
                        if (isClickable && onStepPress) {
                            onStepPress(stepValue)
                        }
                    }

                    const StepContent = (
                        <>
                            {!isLast && (
                                <View
                                    style={[
                                        styles.stepLine,
                                        {
                                            backgroundColor: isCompleted ? theme.colors.primary : theme.colors.outline,
                                        },
                                    ]}
                                />
                            )}
                            <View
                                style={[
                                    styles.stepIndicator,
                                    {
                                        backgroundColor: isActive || isCompleted ? theme.colors.primary : theme.colors.surface,
                                        borderColor: isActive || isCompleted ? theme.colors.primary : theme.colors.outline,
                                    },
                                ]}>
                                {isCompleted ? (
                                    <IconButton
                                        icon='check'
                                        size={16}
                                        iconColor={theme.colors.onPrimary}
                                        style={styles.stepIcon}
                                    />
                                ) : (
                                    <IconButton
                                        icon={step.icon}
                                        size={16}
                                        iconColor={isActive ? theme.colors.onPrimary : theme.colors.outline}
                                        style={styles.stepIcon}
                                    />
                                )}
                            </View>
                            <Text
                                variant='labelSmall'
                                style={[
                                    styles.stepLabel,
                                    {
                                        color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant,
                                        fontWeight: isActive ? 'bold' : 'normal',
                                    },
                                ]}>
                                {step.label}
                            </Text>
                        </>
                    )

                    return (
                        <View key={step.label} style={styles.stepItem}>
                            {isClickable ? (
                                <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.stepTouchable}>
                                    {StepContent}
                                </TouchableOpacity>
                            ) : (
                                StepContent
                            )}
                        </View>
                    )
                })}
            </View>
            <View style={styles.progressBarContainer}>
                <ProgressBar
                    progress={progress}
                    color={theme.colors.primary}
                    style={[styles.progressBar, {transform: [{scaleX: -1}]}]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepperContainer: {
        paddingTop: 16,
    },
    stepperHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    stepTouchable: {
        alignItems: 'center',
        width: '100%',
    },
    stepLine: {
        position: 'absolute',
        top: 18,
        left: '50%',
        width: '100%',
        height: 2,
        zIndex: 0,
    },
    stepIndicator: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        zIndex: 1,
    },
    stepIcon: {
        margin: 0,
        width: 36,
        height: 36,
    },
    stepLabel: {
        textAlign: 'center',
        fontSize: 10,
    },
    progressBarContainer: {
        marginTop: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    progressBar: {
        height: 6,
        borderRadius: 8,
    },
})
