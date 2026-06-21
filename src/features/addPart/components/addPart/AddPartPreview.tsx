import {StyleSheet, View, ScrollView} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'

import {Step, ARABIC_TEXT} from './addPartConstants'
import {PartPreviewSlot} from './PartPreviewSlot'

interface AddPartPreviewProps {
    currentStep: Step
    makeName: string
    makeLogoUrl?: string | null
    modelName: string
    yearLabel: string
    categoryName: string
    onStepPress: (step: Step) => void
}

export const AddPartPreview = ({
    currentStep,
    makeName,
    makeLogoUrl,
    modelName,
    yearLabel,
    categoryName,
    onStepPress,
}: AddPartPreviewProps) => {
    const theme = useAppTheme()

    const all = [
        {step: Step.Make, value: makeName ?? '', icon: 'car-side', logoUrl: makeLogoUrl ?? null},
        {step: Step.Model, value: modelName ?? '', icon: 'car-info', logoUrl: null as string | null},
        {step: Step.Year, value: yearLabel, icon: 'calendar-range', logoUrl: null as string | null},
        {step: Step.Category, value: categoryName ?? '', icon: 'shape', logoUrl: null as string | null},
    ]

    const slots = all.filter(s => s.step < currentStep && s.value !== '')

    if (slots.length === 0) return null

    return (
        <View style={styles.wrapper}>
            <View style={styles.eyebrowRow}>
                <View style={[styles.eyebrowBar, {backgroundColor: theme.colors.tertiary}]} />
                <Text style={[styles.eyebrow, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.YOUR_PART}</Text>
            </View>
            <View
                style={[
                    styles.card,
                    {backgroundColor: theme.colors.surface, borderColor: theme.colors.accentDivider},
                    shadows.sm,
                ]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {slots.map((slot, index) => (
                        <PartPreviewSlot
                            key={slot.step}
                            step={slot.step}
                            value={slot.value}
                            icon={slot.icon}
                            logoUrl={slot.logoUrl}
                            showDivider={index > 0}
                            onPress={onStepPress}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 18,
    },
    eyebrowRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
        marginStart: 4,
    },
    eyebrowBar: {
        width: 12,
        height: 2,
        borderRadius: 1,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
    card: {
        borderRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
    },
    scrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 4,
    },
})
