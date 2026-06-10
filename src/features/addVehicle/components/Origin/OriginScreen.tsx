import {StyleSheet, View, FlatList, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'

import {Skeleton} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {OriginApi} from '@/global/services'

import {OriginCard} from './OriginCard'

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
            <View style={[styles.listContent, {paddingTop: contentTopInset}]}>
                {[0, 1, 2, 3, 4].map(row => (
                    <View key={row} style={[styles.skeletonRow, {backgroundColor: theme.colors.surface}]}>
                        <Skeleton width={44} height={44} radius={14} />
                        <View style={styles.skeletonBody}>
                            <Skeleton width='28%' height={9} radius={5} />
                            <Skeleton width='55%' height={13} radius={7} />
                        </View>
                        <Skeleton width={30} circle />
                    </View>
                ))}
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
    skeletonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 18,
        marginBottom: 10,
    },
    skeletonBody: {
        flex: 1,
        gap: 7,
    },
})
