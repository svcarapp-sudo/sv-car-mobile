import {StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {Screen, Skeleton, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {useAuthStore} from '@/global/store'
import type {CreateOfferRequest} from '@/global/types'
import {haptics} from '@/global/utils'

import {usePartRequestDetail, useSendOffer} from '../../hooks'
import {SendOfferForm} from './SendOfferForm'
import {SendOfferRequestSummary} from './SendOfferRequestSummary'

const T = {
    BACK: 'العودة',
    ERROR_TITLE: 'تعذّر تحميل الطلب',
    SUCCESS: 'تم إرسال عرضك',
    SUBMIT_ERROR: 'تعذّر إرسال العرض',
}

export const SendOfferScreen = () => {
    const theme = useAppTheme()
    const route = useRoute<RouteProp<RootStackParamList, 'SendOffer'>>()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const requestId = route.params?.requestId
    const userPhone = useAuthStore(s => s.user?.phone) ?? ''

    const {request, loading, error} = usePartRequestDetail(requestId)
    const {submitting, submit} = useSendOffer()

    const handleSubmit = async (body: CreateOfferRequest) => {
        if (!requestId) return
        const created = await submit(requestId, body)
        if (created) {
            haptics.success()
            showToast(T.SUCCESS, 'success')
            navigation.goBack()
        } else {
            showToast(T.SUBMIT_ERROR, 'error')
        }
    }

    if (loading && !request) {
        return (
            <View style={[styles.fill, {backgroundColor: theme.colors.background}]}>
                <View style={styles.skeletonBody}>
                    <Skeleton height={90} radius={18} />
                    <Skeleton height={56} radius={12} />
                    <Skeleton height={96} radius={12} />
                    <Skeleton height={56} radius={12} />
                </View>
            </View>
        )
    }

    if (error || !request) {
        return (
            <View style={[styles.centered, {backgroundColor: theme.colors.background}]}>
                <Text style={[styles.errorTitle, {color: theme.colors.onSurface}]}>{T.ERROR_TITLE}</Text>
                <Button mode='outlined' onPress={() => navigation.goBack()} icon='arrow-right'>
                    {T.BACK}
                </Button>
            </View>
        )
    }

    return (
        <Screen style={[styles.fill, {backgroundColor: theme.colors.background}]} contentContainerStyle={styles.content}>
            <SendOfferRequestSummary request={request} />
            <SendOfferForm initialPhone={userPhone} submitting={submitting} onSubmit={handleSubmit} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    fill: {flex: 1},
    content: {paddingBottom: 40},
    skeletonBody: {padding: 16, gap: 14},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12},
    errorTitle: {fontSize: 16, fontWeight: '800'},
})
