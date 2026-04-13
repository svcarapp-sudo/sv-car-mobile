import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    FUEL_TYPE: 'نوع الوقود',
    SELECT_FUEL: 'اختر نوع الوقود المناسب',
}

export interface FuelTypeOption {
    id: string
    name: string
    icon: string
}

interface FuelScreenProps {
    fuelTypes: FuelTypeOption[]
    value: string
    onSelect: (fuelType: string) => void
    onNext: () => void
}

export const FuelScreen = ({fuelTypes, value, onSelect, onNext}: FuelScreenProps) => {
    const theme = useAppTheme()

    const handleSelect = (fuelType: string) => {
        onSelect(fuelType)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.FUEL_TYPE}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.SELECT_FUEL}
                </Text>
            </View>

            <View style={styles.grid}>
                {fuelTypes.map(f => {
                    const isSelected = value === f.name

                    return (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => handleSelect(f.name)}
                            activeOpacity={0.7}
                            style={styles.cardWrapper}>
                            <View
                                style={[
                                    styles.fuelCard,
                                    {backgroundColor: theme.colors.surface},
                                    isSelected && styles.fuelCardSelected,
                                ]}>
                                {isSelected && (
                                    <View style={styles.checkBadge}>
                                        <View style={styles.checkCircle}>
                                            <Icon source='check' size={10} color={theme.colors.onPrimary} />
                                        </View>
                                    </View>
                                )}
                                <View
                                    style={[
                                        styles.iconCircle,
                                        {
                                            backgroundColor: isSelected ? theme.colors.accentMuted : theme.colors.surfaceVariant,
                                        },
                                    ]}>
                                    <Icon
                                        source={f.icon}
                                        size={28}
                                        color={isSelected ? theme.colors.tertiary : theme.colors.onSurfaceVariant}
                                    />
                                </View>
                                <Text
                                    variant='titleSmall'
                                    style={[styles.fuelName, {color: theme.colors.onSurface}, isSelected && {fontWeight: '700'}]}>
                                    {f.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 24,
    },
    stepTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    stepSubtitle: {
        opacity: 0.6,
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    cardWrapper: {
        width: '50%',
        paddingHorizontal: 6,
        marginBottom: 12,
    },
    fuelCard: {
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderColor: 'transparent',
        position: 'relative',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    fuelCardSelected: {
        borderColor: themeColors.tertiary,
        backgroundColor: themeColors.accentSubtle,
        shadowColor: themeColors.tertiary,
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    fuelName: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        start: 10,
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: themeColors.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
