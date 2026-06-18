import {ScrollView, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {FadeSlideIn, PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

import type {PartRequestCondition} from '../../types'

const CONDITIONS: {value: PartRequestCondition | null; label: string; icon: string}[] = [
    {value: null, label: 'أي حالة', icon: 'all-inclusive'},
    {value: 'NEW', label: 'جديد', icon: 'star-four-points-outline'},
    {value: 'USED', label: 'مستعمل', icon: 'sync'},
]

const T = {SECTION: 'أحدث الطلبات'}

interface PartRequestsListFiltersProps {
    condition: PartRequestCondition | null
    onConditionChange: (c: PartRequestCondition | null) => void
    hasResults: boolean
    /** Section-rule label shown above results; defaults to "latest requests". */
    sectionLabel?: string
}

/** Condition chips with haptic press feedback, plus the list section rule. */
export const PartRequestsListFilters = ({
    condition,
    onConditionChange,
    hasResults,
    sectionLabel = T.SECTION,
}: PartRequestsListFiltersProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.wrap}>
            <FadeSlideIn delay={130}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                    {CONDITIONS.map(opt => {
                        const active = condition === opt.value
                        return (
                            <PressableScale
                                key={opt.label}
                                onPress={() => onConditionChange(opt.value)}
                                withHaptic
                                scaleTo={0.94}
                                accessibilityRole='button'
                                accessibilityState={{selected: active}}
                                style={[
                                    styles.chip,
                                    {
                                        backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                                        borderColor: active ? theme.colors.primary : theme.colors.outlineVariant,
                                    },
                                ]}>
                                <Icon
                                    source={opt.icon}
                                    size={13}
                                    color={active ? themeColors.tertiary : theme.colors.onSurfaceVariant}
                                />
                                <Text
                                    style={[styles.chipLabel, {color: active ? theme.colors.onPrimary : theme.colors.onSurface}]}
                                    numberOfLines={1}>
                                    {opt.label}
                                </Text>
                            </PressableScale>
                        )
                    })}
                </ScrollView>
            </FadeSlideIn>

            {hasResults ? (
                <View style={styles.sectionRow}>
                    <Icon source='clock-fast' size={15} color={theme.colors.tertiary} />
                    <Text style={[styles.sectionLabel, {color: theme.colors.onSurface}]}>{sectionLabel}</Text>
                    <View style={[styles.sectionRule, {backgroundColor: theme.colors.outlineVariant}]} />
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {paddingHorizontal: 12, paddingTop: 12, paddingBottom: 6, gap: 12},
    chips: {flexDirection: 'row', alignItems: 'center', gap: 8, paddingEnd: 8},
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 13,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1.2,
        minHeight: 32,
    },
    chipLabel: {fontSize: 12.5, fontWeight: '700', letterSpacing: 0.1},
    sectionRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    sectionLabel: {fontSize: 13, fontWeight: '800', letterSpacing: -0.1},
    sectionRule: {flex: 1, height: StyleSheet.hairlineWidth, marginStart: 4},
})
