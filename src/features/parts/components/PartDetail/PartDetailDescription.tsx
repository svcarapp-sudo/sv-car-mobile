import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    DESCRIPTION: 'الوصف',
}

interface PartDetailDescriptionProps {
    description: string
}

export const PartDetailDescription = ({description}: PartDetailDescriptionProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={styles.header}>
                <View style={[styles.iconBox, {backgroundColor: theme.colors.accentSubtle}]}>
                    <Icon source='text-box-outline' size={16} color={theme.colors.tertiary} />
                </View>
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.DESCRIPTION}</Text>
            </View>
            <Text style={[styles.body, {color: theme.colors.onSurfaceVariant}]}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 22, padding: 18, borderWidth: 1, gap: 12},
    header: {flexDirection: 'row', alignItems: 'center', gap: 10},
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2},
    body: {fontSize: 14, lineHeight: 24, letterSpacing: 0.1, fontWeight: '500'},
})
