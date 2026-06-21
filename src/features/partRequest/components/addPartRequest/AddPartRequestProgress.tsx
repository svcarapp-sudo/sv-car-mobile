import {I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {haptics} from '@/global/utils'

import {ARABIC_TEXT, STEPS, TOTAL_STEPS, type Step} from './addPartRequestSteps'

interface AddPartRequestProgressProps {
    currentStep: Step
    onStepPress?: (step: Step) => void
}

/** Fixed top progress: step counter chip + label + tappable segment bar. */
export const AddPartRequestProgress = ({currentStep, onStepPress}: AddPartRequestProgressProps) => {
    const theme = useAppTheme()
    const meta = STEPS[currentStep]

    const handlePress = (step: Step) => {
        haptics.selection()
        onStepPress?.(step)
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.outlineVariant}]}>
            <View style={styles.topRow}>
                <View style={[styles.chip, {backgroundColor: theme.colors.accentSoft}]}>
                    <Icon source={meta.icon} size={12} color={theme.colors.tertiary} />
                    <Text style={[styles.chipText, {color: theme.colors.tertiary}]}>
                        {ARABIC_TEXT.STEP_OF(currentStep + 1, TOTAL_STEPS)}
                    </Text>
                </View>
                <Text style={[styles.stepName, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {meta.label}
                </Text>
            </View>

            <View
                style={styles.segmentRow}
                accessibilityRole='progressbar'
                accessibilityValue={{min: 1, max: TOTAL_STEPS, now: currentStep + 1}}>
                {STEPS.map((s, index) => {
                    const completed = index < currentStep
                    const active = index === currentStep
                    let color = theme.colors.outlineVariant
                    if (active) color = theme.colors.tertiary
                    else if (completed) color = theme.colors.primary
                    const tappable = completed && onStepPress != null
                    const segment = <View style={[styles.segment, {backgroundColor: color}]} />
                    return tappable ? (
                        <TouchableOpacity
                            key={s.step}
                            style={styles.segmentWrap}
                            onPress={() => handlePress(s.step)}
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
    container: {paddingTop: 14, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: StyleSheet.hairlineWidth},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    chip: {flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999},
    chipText: {fontSize: 11, fontWeight: '800'},
    stepName: {flex: 1, textAlign: I18nManager.isRTL ? 'left' : 'right', fontWeight: '700', fontSize: 14, marginHorizontal: 12},
    segmentRow: {flexDirection: 'row', gap: 6, height: 6},
    segmentWrap: {flex: 1, justifyContent: 'center'},
    segment: {height: 6, borderRadius: 3},
})
