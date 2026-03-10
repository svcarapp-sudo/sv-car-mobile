import {StyleSheet, View, FlatList} from 'react-native'
import {Text, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {OriginApi} from '@/global/services'

import {OriginCard} from './OriginCard'

const ARABIC_TEXT = {
    SELECT_ORIGIN: 'اختر المنشأ',
    SELECT_ORIGIN_DESC: 'حدد بلد المنشأ للمركبة',
    LOADING: 'جاري تحميل المنشأ...',
}

interface OriginScreenProps {
    origins: OriginApi[]
    loading: boolean
    value: number | null
    onSelect: (originId: number, originName: string) => void
    onNext: () => void
}

export const OriginScreen = ({origins, loading, value, onSelect, onNext}: OriginScreenProps) => {
    const theme = useAppTheme()

    const handleSelect = (origin: OriginApi) => {
        onSelect(origin.id, origin.name)
        onNext()
    }

    if (loading && origins.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={theme.colors.tertiary} />
                <Text variant='bodyMedium' style={[styles.loadingText, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={origins}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <OriginCard item={item} isSelected={value === item.id} onPress={handleSelect} />
                )}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.SELECT_ORIGIN}
                        </Text>
                        <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.SELECT_ORIGIN_DESC}
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
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
    listContent: {
        paddingBottom: 24,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
    },
})
