import {StyleSheet, View} from 'react-native'
import {Text, IconButton, ActivityIndicator, useTheme, FAB} from 'react-native-paper'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    NO_PARTS: 'لا توجد قطع غيار',
    NO_PARTS_DESC: 'ابدأ بإضافة قطع غيار للبيع',
    LOADING: 'جاري التحميل...',
    ADD_PART: 'إضافة قطعة',
}

interface MyPartsListEmptyProps {
    loading: boolean
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListEmpty = ({loading, navigation}: MyPartsListEmptyProps) => {
    const theme = useTheme()

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.emptyContainer}>
            <Text variant='headlineSmall' style={[styles.emptyTitle, {color: theme.colors.onBackground}]}>
                {ARABIC_TEXT.NO_PARTS}
            </Text>
            <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.NO_PARTS_DESC}
            </Text>
            <IconButton
                icon='car'
                size={48}
                iconColor={theme.colors.primary}
                onPress={() => navigation?.navigate('AddPart')}
                style={styles.iconButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        marginBottom: 16,
    },
    iconButton: {
        marginTop: 16,
    },
})
