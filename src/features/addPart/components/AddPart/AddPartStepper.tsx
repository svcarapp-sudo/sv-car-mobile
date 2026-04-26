import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const STEPS_INFO = [
    {label: 'الماركة', icon: 'car-outline', hint: 'اختر ماركة المركبة'},
    {label: 'الموديل', icon: 'car-info', hint: 'اختر موديل المركبة'},
    {label: 'السنة', icon: 'calendar', hint: 'اختر سنة الصنع'},
    {label: 'الفئة', icon: 'shape', hint: 'اختر فئة القطعة'},
    {label: 'التفاصيل', icon: 'text-box-outline', hint: 'أدخل تفاصيل القطعة'},
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
    const current = STEPS_INFO[currentStep]

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
            <View style={styles.stepsRow}>
                {STEPS_INFO.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    const Wrapper = isCompleted ? TouchableOpacity : View
                    const wrapperProps = isCompleted ? {onPress: () => onStepPress?.(index as Step), activeOpacity: 0.6} : {}
                    return (
                        <Wrapper key={step.label} style={styles.stepItem} {...wrapperProps}>
                            <View
                                style={[
                                    styles.dot,
                                    isActive && [styles.dotActive, {borderColor: theme.colors.tertiary}],
                                    isCompleted && {backgroundColor: theme.colors.tertiary},
                                    !isActive && !isCompleted && {backgroundColor: themeColors.onDarkSurface},
                                ]}>
                                <Icon
                                    source={isCompleted ? 'check' : step.icon}
                                    size={14}
                                    color={isCompleted || isActive ? themeColors.onPrimary : themeColors.onDarkMuted}
                                />
                            </View>
                        </Wrapper>
                    )
                })}
            </View>

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

            <View style={styles.captionRow}>
                <Text variant='labelSmall' style={[styles.counter, {color: themeColors.onDarkMedium}]}>
                    {`الخطوة ${currentStep + 1} من ${STEPS_INFO.length}`}
                </Text>
                <Text variant='labelLarge' style={[styles.hint, {color: themeColors.onPrimary}]} numberOfLines={1}>
                    {current.hint}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingTop: 14, paddingBottom: 12},
    stepsRow: {flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 12},
    stepItem: {alignItems: 'center', flex: 1},
    dot: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center'},
    dotActive: {backgroundColor: themeColors.onDarkOverlay, borderWidth: 2},
    progressTrack: {height: 3, marginHorizontal: 16, borderRadius: 2, overflow: 'hidden'},
    progressFill: {height: '100%', borderRadius: 2},
    captionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginTop: 10,
    },
    counter: {fontWeight: '500', letterSpacing: 0.3},
    hint: {fontWeight: '700', flexShrink: 1, marginStart: 10, textAlign: 'right'},
})
