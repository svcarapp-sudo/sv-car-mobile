import {StyleSheet, View, FlatList, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'
import {Text, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {OriginApi} from '@/global/services'

import {OriginCard} from './OriginCard'

const ARABIC_TEXT = {
    LOADING: 'جارٍ تحميل المنشأ…',
}

interface OriginScreenProps {
    origins: OriginApi[]
    loading: boolean
    value: number | null
    onSelect: (originId: number, originName: string) => void
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset?: number
}

export const OriginScreen = ({origins, loading, value, onSelect, onNext, onScroll, contentTopInset = 0}: OriginScreenProps) => {
    const theme = useAppTheme()

    const handleSelect = (origin: OriginApi) => {
        onSelect(origin.id, origin.name)
        onNext()
    }

    if (loading && origins.length === 0) {
        return (
            <View style={[styles.centered, {paddingTop: contentTopInset}]}>
                <ActivityIndicator size='large' color={theme.colors.tertiary} />
                <Text variant='bodyMedium' style={[styles.loadingText, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            data={origins}
            keyExtractor={item => String(item.id)}
            renderItem={({item, index}) => (
                <OriginCard item={item} index={index} isSelected={value === item.id} onPress={handleSelect} />
            )}
            contentContainerStyle={[styles.listContent, {paddingTop: contentTopInset}]}
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
        />
    )
}

const styles = StyleSheet.create({
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
