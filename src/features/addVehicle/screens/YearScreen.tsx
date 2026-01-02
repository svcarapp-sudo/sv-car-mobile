import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native'
import {Text, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

const ARABIC_TEXT = {
    PRODUCTION_YEAR: 'سنة الصنع',
    SELECT_YEAR: 'اختر سنة صنع المركبة',
}

interface YearScreenProps {
    value: string
    onSelect: (year: string) => void
    onNext: () => void
}

export const YearScreen = ({value, onSelect, onNext}: YearScreenProps) => {
    const {years} = useVehicleInfo()
    const theme = useTheme()

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
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[
                            styles.yearItem,
                            {backgroundColor: theme.colors.surface},
                            value === item && {
                                borderColor: theme.colors.primary,
                                borderWidth: 2,
                                backgroundColor: theme.colors.primaryContainer,
                            },
                        ]}
                        onPress={() => handleSelect(item)}>
                        <Text
                            variant='titleMedium'
                            style={{
                                color: value === item ? theme.colors.primary : theme.colors.onSurfaceVariant,
                                fontWeight: value === item ? 'bold' : 'normal',
                            }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.yearGrid}
            />
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
        marginBottom: 4,
        fontWeight: 'bold',
    },
    stepSubtitle: {
        opacity: 0.7,
    },
    yearGrid: {
        paddingBottom: 24,
    },
    yearItem: {
        flex: 1,
        aspectRatio: 1.8,
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
})
