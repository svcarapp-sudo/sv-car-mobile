import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native'
import {Text, Icon, useTheme, ActivityIndicator} from 'react-native-paper'

import type {OriginApi} from '@/global/services'

const AMBER = '#F59E0B'

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
    const theme = useTheme()

    const handleSelect = (origin: OriginApi) => {
        onSelect(origin.id, origin.name)
        onNext()
    }

    if (loading && origins.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={AMBER} />
                <Text variant='bodyMedium' style={[styles.loadingText, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    const renderItem = ({item}: {item: OriginApi}) => {
        const isSelected = value === item.id

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
                style={[
                    styles.originCard,
                    {backgroundColor: theme.colors.surface},
                    isSelected && styles.originCardSelected,
                ]}>
                {isSelected && <View style={styles.selectedAccent} />}
                <View style={styles.originContent}>
                    <View
                        style={[
                            styles.originIcon,
                            {
                                backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.12)' : theme.colors.surfaceVariant,
                            },
                        ]}>
                        <Icon source='earth' size={20} color={isSelected ? AMBER : theme.colors.onSurfaceVariant} />
                    </View>
                    <Text
                        variant='titleMedium'
                        style={[
                            styles.originName,
                            {color: theme.colors.onSurface},
                            isSelected && {fontWeight: '700'},
                        ]}>
                        {item.name}
                    </Text>
                </View>
                {isSelected && (
                    <View style={styles.checkWrap}>
                        <Icon source='check-circle' size={22} color={AMBER} />
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.stepContent}>
            <FlatList
                data={origins}
                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
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
    originCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    originCardSelected: {
        borderColor: AMBER,
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        shadowColor: AMBER,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedAccent: {
        position: 'absolute',
        start: 0,
        top: 10,
        bottom: 10,
        width: 4,
        borderRadius: 2,
        backgroundColor: AMBER,
    },
    originContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    originIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    originName: {
        flex: 1,
        fontWeight: '500',
    },
    checkWrap: {
        marginStart: 8,
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
