import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

import {Step} from './AddVehicleStepper'

interface AddVehicleSummaryCardProps {
    currentStep: Step
    originName?: string
    make?: string
    makeLogoUrl?: string | null
    model?: string
    year?: string
    fuelType?: string
    onStepPress: (step: Step) => void
}

interface SummaryItem {
    step: Step
    value: string
    icon: string
    logoUrl?: string | null
}

export const AddVehicleSummaryCard = ({
    currentStep,
    make,
    makeLogoUrl,
    model,
    year,
    fuelType,
    onStepPress,
}: AddVehicleSummaryCardProps) => {
    const theme = useAppTheme()

    const allItems: SummaryItem[] = [
        {step: Step.Make, value: make ?? '', icon: 'car-side', logoUrl: makeLogoUrl},
        {step: Step.Model, value: model ?? '', icon: 'car-info'},
        {step: Step.Year, value: year ?? '', icon: 'calendar-range'},
        {step: Step.Fuel, value: fuelType ?? '', icon: 'gas-station'},
    ]

    const items = allItems.filter(item => item.step < currentStep && item.value !== '')

    if (items.length === 0) return null

    return (
        <View style={styles.bar}>
            <View style={styles.accentEdge} />
            <View style={styles.content}>
                {items.map((item, index) => (
                    <View key={item.step} style={styles.itemRow}>
                        {index > 0 && (
                            <Icon source="chevron-left" size={14} color={theme.colors.outline} />
                        )}
                        <TouchableOpacity
                            onPress={() => onStepPress(item.step)}
                            activeOpacity={0.5}
                            style={[styles.chip, {backgroundColor: theme.colors.surfaceVariant}]}>
                            {item.logoUrl ? (
                                <View style={styles.logoWrap}>
                                    <Image
                                        source={{uri: item.logoUrl}}
                                        style={styles.logo}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : (
                                <Icon source={item.icon} size={13} color={theme.colors.tertiary} />
                            )}
                            <Text
                                style={[styles.value, {color: theme.colors.onSurface}]}
                                numberOfLines={1}>
                                {item.value}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: themeColors.surface,
        borderRadius: 14,
        marginBottom: 16,
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    accentEdge: {
        width: 4,
        backgroundColor: themeColors.tertiary,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingStart: 12,
        paddingEnd: 14,
        gap: 4,
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    chip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    logoWrap: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: themeColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: themeColors.scrim,
    },
    logo: {
        width: 13,
        height: 13,
    },
    value: {
        fontSize: 12,
        fontWeight: '700',
    },
})
