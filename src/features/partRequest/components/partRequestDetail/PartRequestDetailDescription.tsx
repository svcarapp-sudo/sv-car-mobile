import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

const T = {
    HEADING: 'تفاصيل الطلب',
    EMPTY: 'لم يقم صاحب الطلب بإضافة تفاصيل إضافية.',
}

interface PartRequestDetailDescriptionProps {
    description?: string | null
}

export const PartRequestDetailDescription = ({description}: PartRequestDetailDescriptionProps) => {
    const theme = useAppTheme()
    const hasContent = description != null && description.trim().length > 0

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.headingRow}>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentSubtle}]}>
                    <Icon source='text-long' size={18} color={theme.colors.tertiary} />
                </View>
                <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
            </View>
            <Text
                style={[
                    styles.body,
                    {
                        color: hasContent ? theme.colors.onSurface : theme.colors.onSurfaceVariant,
                        fontStyle: hasContent ? 'normal' : 'italic',
                    },
                ]}
                selectable={hasContent}>
                {hasContent ? description : T.EMPTY}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 18,
        padding: 16,
        ...shadows.sm,
        shadowColor: themeColors.shadow,
    },
    headingRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10},
    iconWrap: {width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center'},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    body: {fontSize: 13.5, lineHeight: 22, fontWeight: '500'},
})
