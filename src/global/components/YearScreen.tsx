import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    PRODUCTION_YEAR: 'سنة الصنع',
    SELECT_YEAR: 'اختر سنة صنع المركبة',
}

interface YearScreenProps {
    years: number[]
    value: string
    onSelect: (year: string) => void
    onNext: () => void
}

export const YearScreen = ({years, value, onSelect, onNext}: YearScreenProps) => {
    const theme = useAppTheme()

    const handleSelect = (year: string) => {
        onSelect(year)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.PRODUCTION_YEAR}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.SELECT_YEAR}
                </Text>
            </View>
            <FlatList
                data={years.map(String)}
                numColumns={3}
                keyExtractor={item => item}
                renderItem={({item}) => {
                    const isSelected = value === item

                    return (
                        <TouchableOpacity
                            style={[
                                styles.yearItem,
                                {backgroundColor: theme.colors.surface},
                                isSelected && styles.yearItemSelected,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => handleSelect(item)}>
                            <Text
                                variant='titleMedium'
                                style={[
                                    styles.yearText,
                                    {color: theme.colors.onSurfaceVariant},
                                    isSelected && styles.yearTextSelected,
                                ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={styles.yearGrid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 20,
    },
    stepTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    stepSubtitle: {
        opacity: 0.6,
        fontSize: 14,
    },
    yearGrid: {
        paddingBottom: 24,
    },
    yearItem: {
        flex: 1,
        aspectRatio: 2,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: 'transparent',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    yearItemSelected: {
        backgroundColor: themeColors.tertiary,
        borderColor: themeColors.tertiary,
        shadowColor: themeColors.tertiary,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    yearText: {
        fontWeight: '500',
    },
    yearTextSelected: {
        color: themeColors.onPrimary,
        fontWeight: '700',
    },
})
