import React from 'react'
import {StyleSheet, View, FlatList, Alert} from 'react-native'
import {useTheme, FAB} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useMyParts} from '../hooks/useMyParts'
import {useMakeModelCache} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {MyPartCardItem} from './MyPartCardItem'
import {MyPartsListEmpty} from './MyPartsListEmpty'

const ARABIC_TEXT = {
    DELETE: 'حذف',
    DELETE_CONFIRM: 'هل أنت متأكد من حذف هذه القطعة؟',
    DELETE_SUCCESS: 'تم حذف القطعة بنجاح',
    DELETE_ERROR: 'فشل حذف القطعة',
    ADD_PART: 'إضافة قطعة',
}

interface MyPartsListScreenProps {
    route?: RouteProp<RootStackParamList, 'MyParts'>
    navigation?: NavigationProp<RootStackParamList>
}

export const MyPartsListScreen = ({navigation}: MyPartsListScreenProps) => {
    const theme = useTheme()
    const {parts, loading, deletePart, fetchMyParts} = useMyParts()
    const makeModelCache = useMakeModelCache({parts})

    const handleDelete = (partId: string, partName: string) => {
        Alert.alert(ARABIC_TEXT.DELETE, ARABIC_TEXT.DELETE_CONFIRM, [
            {
                text: 'إلغاء',
                style: 'cancel',
            },
            {
                text: ARABIC_TEXT.DELETE,
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deletePart(partId)
                        Alert.alert(ARABIC_TEXT.DELETE_SUCCESS)
                    } catch (error) {
                        Alert.alert(ARABIC_TEXT.DELETE_ERROR, error instanceof Error ? error.message : '')
                    }
                },
            },
        ])
    }

    const handleEdit = (partId: string) => {
        navigation?.navigate('EditPart', {partId})
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <FlatList
                data={parts}
                renderItem={({item}) => (
                    <MyPartCardItem
                        part={item}
                        navigation={navigation}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        makeModelCache={makeModelCache}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={fetchMyParts}
                ListEmptyComponent={<MyPartsListEmpty loading={loading && parts.length === 0} navigation={navigation} />}
            />
            <FAB
                icon='plus'
                label={ARABIC_TEXT.ADD_PART}
                style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                onPress={() => navigation?.navigate('AddPart')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
