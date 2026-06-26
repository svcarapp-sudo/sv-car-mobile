import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import type {PartRequest} from '../../types'
import {PartRequestCardItem} from '../partRequestsList/PartRequestCardItem'

const T = {OFFER: 'تقديم عرض', OFFERED: 'تم إرسال عرض'}

interface MatchedRequestCardProps {
    request: PartRequest
    alreadyOffered: boolean
    onPress: () => void
    onOffer: () => void
}

/** Matched-feed card: the shared request card plus a seller "make offer" action. */
export const MatchedRequestCard = ({request, alreadyOffered, onPress, onOffer}: MatchedRequestCardProps) => {
    const theme = useAppTheme()

    return (
        <View>
            <PartRequestCardItem request={request} onPress={onPress} />
            <View style={styles.actionRow}>
                <Button
                    mode={alreadyOffered ? 'outlined' : 'contained'}
                    onPress={onOffer}
                    disabled={alreadyOffered}
                    icon={alreadyOffered ? 'check' : 'tag-plus-outline'}
                    buttonColor={alreadyOffered ? undefined : theme.colors.tertiary}
                    textColor={alreadyOffered ? theme.colors.onSurfaceVariant : theme.colors.onTertiary}
                    style={styles.btn}
                    contentStyle={styles.btnContent}>
                    {alreadyOffered ? T.OFFERED : T.OFFER}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    actionRow: {marginHorizontal: 12, marginTop: -4, marginBottom: 12},
    btn: {borderRadius: 12},
    btnContent: {paddingVertical: 4},
})
