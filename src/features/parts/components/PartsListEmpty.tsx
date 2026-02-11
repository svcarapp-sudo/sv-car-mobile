import {StyleSheet, View} from 'react-native'
import {Text, IconButton, ActivityIndicator, useTheme} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    NO_PARTS_FOUND: 'لم يتم العثور على قطع',
    NO_PARTS_IN_CATEGORY: (category: string) => `لم يتم العثور على قطع في فئة ${category}`,
    NO_PARTS_DESC: 'لا توجد قطع متاحة. يرجى التأكد من اختيار مركبة.',
    NO_PARTS_VEHICLE: 'لا توجد قطع متاحة لهذه المركبة',
    LOADING: 'جاري تحميل القطع...',
}

interface PartsListEmptyProps {
    loading: boolean
    categoryName?: string | null
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListEmpty = ({loading, categoryName, navigation}: PartsListEmptyProps) => {
    const theme = useTheme()

    if (loading) {
        return (
            <View style={styles.emptyContainer}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <View style={styles.emptyContainer}>
            <Text variant='headlineSmall' style={[styles.emptyTitle, {color: theme.colors.onBackground}]}>
                {ARABIC_TEXT.NO_PARTS_FOUND}
            </Text>
            <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                {categoryName ? ARABIC_TEXT.NO_PARTS_IN_CATEGORY(categoryName) : ARABIC_TEXT.NO_PARTS_VEHICLE}
            </Text>
            {!categoryName && (
                <IconButton
                    icon='car'
                    size={48}
                    iconColor={theme.colors.primary}
                    onPress={() => navigation?.navigate('AddVehicle')}
                    style={styles.iconButton}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        minHeight: 400,
    },
    emptyTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        opacity: 0.7,
        marginTop: 8,
    },
    iconButton: {
        marginTop: 16,
    },
})
