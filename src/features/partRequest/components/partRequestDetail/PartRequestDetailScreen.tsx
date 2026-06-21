import {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {Skeleton, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import type {RootStackParamList} from '@/global/navigation/types'
import {haptics} from '@/global/utils'

import {usePartRequestDetail} from '../../hooks'
import type {PartRequestStatus} from '../../types'
import {PartRequestDetailBudget} from './PartRequestDetailBudget'
import {PartRequestDetailContact} from './PartRequestDetailContact'
import {PartRequestDetailDescription} from './PartRequestDetailDescription'
import {PartRequestDetailHero} from './PartRequestDetailHero'
import {PartRequestDetailOwnerActions} from './PartRequestDetailOwnerActions'
import {PartRequestDetailVehicle} from './PartRequestDetailVehicle'

const T = {
    BACK: 'العودة',
    ERROR_TITLE: 'تعذّر تحميل الطلب',
    STATUS_ERROR: 'تعذر تحديث حالة الطلب',
}

const STATUS_DONE: Record<PartRequestStatus, string> = {
    FULFILLED: 'تم تحديد الطلب كمكتمل',
    CLOSED: 'تم إغلاق الطلب',
    OPEN: 'تم إعادة فتح الطلب',
}

interface PartRequestDetailScreenProps {
    route?: RouteProp<RootStackParamList, 'PartRequestDetail'>
    navigation?: NavigationProp<RootStackParamList>
}

export const PartRequestDetailScreen = ({route, navigation}: PartRequestDetailScreenProps) => {
    const theme = useAppTheme()
    const currentUserId = useAuthStore(s => s.user?.id)
    const requestId = route?.params?.requestId
    const {request, loading, error, setStatus} = usePartRequestDetail(requestId)
    const [busy, setBusy] = useState(false)

    const handleStatus = async (status: PartRequestStatus) => {
        setBusy(true)
        try {
            await setStatus(status)
            haptics.success()
            showToast(STATUS_DONE[status], 'success')
        } catch {
            showToast(T.STATUS_ERROR, 'error')
        } finally {
            setBusy(false)
        }
    }

    if (loading && !request) {
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <Skeleton height={190} radius={0} />
                <View style={styles.skeletonBody}>
                    <Skeleton width='70%' height={18} radius={9} />
                    <Skeleton width='45%' height={12} radius={6} />
                    <Skeleton height={128} radius={18} />
                    <Skeleton height={96} radius={18} />
                    <Skeleton height={120} radius={18} />
                </View>
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
            {isOwner ? (
                <PartRequestDetailOwnerActions request={request} busy={busy} onStatusChange={handleStatus} />
            ) : (
                <PartRequestDetailContact request={request} />
            )}
            <PartRequestDetailBudget request={request} />
            <PartRequestDetailVehicle request={request} />
            <PartRequestDetailDescription description={request.description} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {paddingBottom: 32},
    skeletonBody: {padding: 16, gap: 14},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 8},
    errorTitle: {fontSize: 16, fontWeight: '800'},
    errorBody: {fontSize: 13, textAlign: 'center', marginBottom: 12},
})
