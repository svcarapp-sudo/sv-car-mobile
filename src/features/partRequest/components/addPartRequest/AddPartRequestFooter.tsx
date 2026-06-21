import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

import {ARABIC_TEXT, Step, TOTAL_STEPS} from './addPartRequestSteps'

interface AddPartRequestFooterProps {
    currentStep: Step
    canProceed: boolean
    submitting: boolean
    onBack: () => void
    onNext: () => void
}

/** Pinned wizard footer: a ghost back/cancel pill + a prominent primary advance pill. */
export const AddPartRequestFooter = ({currentStep, canProceed, submitting, onBack, onNext}: AddPartRequestFooterProps) => {
    const theme = useAppTheme()
    const isFirst = currentStep === Step.Vehicle
    const isLast = currentStep === TOTAL_STEPS - 1
    const nextDisabled = submitting || !canProceed

    return (
        <View style={[styles.row, {backgroundColor: theme.colors.surface, borderTopColor: theme.colors.outlineVariant}]}>
            <PressableScale
                onPress={onBack}
                withHaptic
                disabled={submitting}
                containerStyle={styles.backWrap}
                style={[
                    styles.backBtn,
                    {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outlineVariant},
                    submitting && styles.dim,
                ]}
                accessibilityRole='button'
                accessibilityLabel={isFirst ? ARABIC_TEXT.CANCEL : ARABIC_TEXT.BACK}>
                <Icon source={isFirst ? 'close' : 'chevron-right'} size={18} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.backLabel, {color: theme.colors.onSurface}]}>
                    {isFirst ? ARABIC_TEXT.CANCEL : ARABIC_TEXT.BACK}
                </Text>
            </PressableScale>

            <PressableScale
                onPress={onNext}
                withHaptic
                disabled={nextDisabled}
                containerStyle={styles.nextWrap}
                style={[styles.nextBtn, {backgroundColor: theme.colors.primary}, nextDisabled && styles.dim]}
                accessibilityRole='button'
                accessibilityState={{disabled: nextDisabled}}
                accessibilityLabel={isLast ? ARABIC_TEXT.SUBMIT : ARABIC_TEXT.NEXT}>
                <Text style={[styles.nextLabel, {color: theme.colors.onPrimary}]}>
                    {isLast ? ARABIC_TEXT.SUBMIT : ARABIC_TEXT.NEXT}
                </Text>
                {submitting ? (
                    <ActivityIndicator size={16} color={theme.colors.onPrimary} />
                ) : (
                    <Icon source={isLast ? 'send' : 'arrow-left'} size={18} color={theme.colors.onPrimary} />
                )}
            </PressableScale>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    backWrap: {flexShrink: 0},
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 52,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1.5,
    },
    backLabel: {fontSize: 14, fontWeight: '800'},
    nextWrap: {flex: 1},
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 52,
        borderRadius: 16,
        ...shadows.md,
        shadowColor: themeColors.shadow,
    },
    nextLabel: {fontSize: 15, fontWeight: '800', letterSpacing: 0.2},
    dim: {opacity: 0.45},
})
