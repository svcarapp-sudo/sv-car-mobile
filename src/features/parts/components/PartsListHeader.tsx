import {StyleSheet, View} from 'react-native'
import {Text, useTheme} from 'react-native-paper'

const ARABIC_TEXT = {
    PARTS_COUNT: (count: number) => `${count} قطعة`,
}

interface PartsListHeaderProps {
    categoryName: string
    partsCount: number
}

export const PartsListHeader = ({categoryName, partsCount}: PartsListHeaderProps) => {
    const theme = useTheme()

    return (
        <View style={[styles.header, {backgroundColor: theme.colors.surfaceVariant}]}>
            <Text variant='headlineSmall' style={[styles.headerTitle, {color: theme.colors.primary}]}>
                {categoryName}
            </Text>
            <Text variant='bodyMedium' style={[styles.headerSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.PARTS_COUNT(partsCount)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        paddingBottom: 8,
    },
    headerTitle: {
        marginBottom: 4,
    },
    headerSubtitle: {
        opacity: 0.7,
    },
})
