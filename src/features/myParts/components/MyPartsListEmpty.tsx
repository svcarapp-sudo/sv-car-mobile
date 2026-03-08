import {StyleSheet, View} from 'react-native'
import {Text, Button, Icon, ActivityIndicator} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    NO_PARTS: 'لا توجد قطع غيار بعد',
    NO_PARTS_DESC: 'أضف قطع الغيار التي تريد بيعها وابدأ\nبعرضها للمشترين المهتمين',
    LOADING: 'جاري تحميل قطع الغيار...',
    ADD_FIRST_PART: 'أضف أول قطعة',
}

interface MyPartsListEmptyProps {
    loading: boolean
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListEmpty = ({loading, navigation}: MyPartsListEmptyProps) => {
    const theme = useAppTheme()

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text variant="bodyMedium" style={[styles.loadingText, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={[styles.iconCircle, {backgroundColor: theme.colors.primaryContainer}]}>
                <Icon source="package-variant-plus" size={48} color={theme.colors.primary} />
            </View>

            <Text variant="titleLarge" style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.NO_PARTS}
            </Text>

            <Text variant="bodyMedium" style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.NO_PARTS_DESC}
            </Text>

            <Button
                mode="contained"
                icon="plus"
                onPress={() => navigation?.navigate('AddPart')}
                style={styles.addButton}
                contentStyle={styles.addButtonContent}>
                {ARABIC_TEXT.ADD_FIRST_PART}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        minHeight: 450,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    loadingText: {
        marginTop: 16,
    },
    addButton: {
        borderRadius: 12,
    },
    addButtonContent: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
})
