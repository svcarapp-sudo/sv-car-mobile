import {StyleSheet, View} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    GOOD_MORNING: 'صباح الخير',
    GOOD_EVENING: 'مساء الخير',
    FIND_PARTS: 'ابحث عن قطع الغيار المناسبة لسيارتك',
}

const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return ARABIC_TEXT.GOOD_MORNING
    return ARABIC_TEXT.GOOD_EVENING
}

interface GreetingSectionProps {
    userName?: string | null
}

export const GreetingSection = ({userName}: GreetingSectionProps) => {
    const theme = useAppTheme()
    const greeting = getTimeGreeting()

    return (
        <View style={styles.row}>
            <View style={[styles.icon, {backgroundColor: theme.colors.primaryContainer}]}>
                <Icon source='hand-wave' size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.text}>
                <Text variant='titleMedium' style={[styles.name, {color: theme.colors.onSurface}]}>
                    {greeting}{userName ? ` ${userName}` : ''}
                </Text>
                <Text variant='bodySmall' style={[styles.sub, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.FIND_PARTS}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 12,
    },
    text: {
        flex: 1,
    },
    name: {
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    sub: {
        opacity: 0.7,
        marginTop: 1,
    },
})
