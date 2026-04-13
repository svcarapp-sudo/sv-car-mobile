import {useMemo} from 'react'
import {StyleSheet, View, FlatList, Alert} from 'react-native'
import {FAB, Text, Icon} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useMyParts} from '../../hooks/useMyParts'
import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import type {Part} from '@/global/types'
import {MyPartCardItem} from './MyPartCardItem'
import {MyPartsListEmpty} from './MyPartsListEmpty'

const ARABIC_TEXT = {
    DELETE: 'حذف القطعة',
    DELETE_CONFIRM: 'هل أنت متأكد من حذف هذه القطعة؟\nلا يمكن التراجع عن هذا الإجراء.',
    DELETE_ERROR: 'فشل حذف القطعة',
    ADD_PART: 'إضافة قطعة',
    CANCEL: 'إلغاء',
    TOTAL_PARTS: 'عدد القطع',
    TOTAL_VALUE: 'القيمة الإجمالية',
}

interface MyPartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'MyParts'>
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListScreen = ({navigation}: MyPartsListScreenProps) => {
    const theme = useAppTheme()
    const {parts, loading, deletePart, fetchMyParts} = useMyParts()
    const {getBySlug, categories} = useCatalog()

    const stats = useMemo(() => {
        const totalValue = parts.reduce((sum, p) => sum + p.price, 0)
        return {count: parts.length, totalValue}
    }, [parts])

    const handleDelete = (partId: string, partName: string) => {
        Alert.alert(ARABIC_TEXT.DELETE, ARABIC_TEXT.DELETE_CONFIRM, [
            {text: ARABIC_TEXT.CANCEL, style: 'cancel'},
            {
                text: ARABIC_TEXT.DELETE,
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deletePart(partId)
                    } catch {
                        Alert.alert(ARABIC_TEXT.DELETE_ERROR)
                    }
                },
            },
        ])
    }

    const getCategoryInfo = (part: Part) => {
        return getBySlug(part.category) || categories.find(c => c.id === part.categoryId) || null
    }

    const renderHeader = () => {
        if (parts.length === 0) return null
        return (
            <View style={styles.statsRow}>
                <View style={[styles.statCard, {backgroundColor: theme.colors.primaryContainer}]}>
                    <View style={[styles.statIcon, {backgroundColor: theme.colors.surface}]}>
                        <Icon source="package-variant" size={18} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.statValue, {color: theme.colors.primary}]}>{stats.count}</Text>
                    <Text style={[styles.statLabel, {color: theme.colors.primary}]}>{ARABIC_TEXT.TOTAL_PARTS}</Text>
                </View>
                <View style={[styles.statCard, {backgroundColor: theme.colors.accentContainer}]}>
                    <View style={[styles.statIcon, {backgroundColor: theme.colors.surface}]}>
                        <Icon source="cash" size={18} color={theme.colors.tertiary} />
                    </View>
                    <Text style={[styles.statValue, {color: theme.colors.tertiary}]}>${stats.totalValue.toFixed(0)}</Text>
                    <Text style={[styles.statLabel, {color: theme.colors.tertiary}]}>{ARABIC_TEXT.TOTAL_VALUE}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={parts}
                renderItem={({item}) => (
                    <MyPartCardItem
                        part={item}
                        onEdit={id => navigation?.navigate('EditPart', {partId: id})}
                        onDelete={handleDelete}
                        categoryInfo={getCategoryInfo(item)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, parts.length === 0 && styles.emptyContent]}
                refreshing={loading}
                onRefresh={fetchMyParts}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={<MyPartsListEmpty loading={loading && parts.length === 0} navigation={navigation} />}
            />
            <FAB
                icon="plus"
                label={ARABIC_TEXT.ADD_PART}
                style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                color={theme.colors.onPrimary}
                onPress={() => navigation?.navigate('AddPart')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContent: {padding: 16, paddingBottom: 80},
    emptyContent: {flexGrow: 1},
    statsRow: {flexDirection: 'row', gap: 12, marginBottom: 16},
    statCard: {flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 14, gap: 4},
    statIcon: {width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 2},
    statValue: {fontSize: 20, fontWeight: '700'},
    statLabel: {fontSize: 11, fontWeight: '500', opacity: 0.8},
    fab: {position: 'absolute', margin: 16, end: 0, bottom: 0, borderRadius: 16},
})
