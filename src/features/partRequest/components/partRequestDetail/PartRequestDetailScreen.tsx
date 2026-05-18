import {ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Text} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import type {RootStackParamList} from '@/global/navigation/types'

import {usePartRequestDetail} from '../../hooks'
import {PartRequestDetailBudget} from './PartRequestDetailBudget'
import {PartRequestDetailContact} from './PartRequestDetailContact'
import {PartRequestDetailDescription} from './PartRequestDetailDescription'
import {PartRequestDetailHero} from './PartRequestDetailHero'
import {PartRequestDetailVehicle} from './PartRequestDetailVehicle'

const T = {
    BACK: 'العودة',
    ERROR_TITLE: 'تعذّر تحميل الطلب',
}

interface PartRequestDetailScreenProps {
    route?: RouteProp<RootStackParamList, 'PartRequestDetail'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartRequestDetailScreen = ({route, navigation}: PartRequestDetailScreenProps) => {
    const theme = useAppTheme()
    const currentUserId = useAuthStore(s => s.user?.id)
    const requestId = route?.params?.requestId
    const {request, loading, error} = usePartRequestDetail(requestId)

    if (loading && !request) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
            </View>
        )
    }

    if (error || !request) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.errorTitle, {color: theme.colors.onSurface}]}>{T.ERROR_TITLE}</Text>
                {error && <Text style={[styles.errorBody, {color: theme.colors.onSurfaceVariant}]}>{error}</Text>}
                <Button mode='outlined' onPress={() => navigation?.goBack()} icon='arrow-right'>
                    {T.BACK}
                </Button>
            </View>
        )
    }

    const isOwner = currentUserId != null && Number(currentUserId) === request.requesterUserId

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <PartRequestDetailHero request={request} />
            <PartRequestDetailContact request={request} isOwner={isOwner} />
            <PartRequestDetailBudget request={request} />
            <PartRequestDetailVehicle request={request} />
            <PartRequestDetailDescription description={request.description} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {paddingBottom: 32},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8},
    errorTitle: {fontSize: 16, fontWeight: '800'},
    errorBody: {fontSize: 13, textAlign: 'center', marginBottom: 12},
})
