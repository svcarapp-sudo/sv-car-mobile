import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface StepHeaderProps {
    title: string
    subtitle?: string
    eyebrow?: string
}

export const StepHeader = ({title, subtitle, eyebrow}: StepHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            {eyebrow ? (
                <View style={styles.eyebrowRow}>
                    <View style={[styles.eyebrowDot, {backgroundColor: theme.colors.tertiary}]} />
                    <Text variant='labelSmall' style={[styles.eyebrow, {color: theme.colors.tertiary}]}>
                        {eyebrow}
                    </Text>
                </View>
            ) : null}
            <Text variant='headlineSmall' style={[styles.title, {color: theme.colors.onSurface}]}>
                {title}
            </Text>
            {subtitle ? (
                <Text variant='bodyMedium' style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {subtitle}
                </Text>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },
    eyebrowRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    eyebrowDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    eyebrow: {
        fontWeight: '700',
        letterSpacing: 0.4,
        fontSize: 11,
    },
    title: {
        fontWeight: '800',
        fontSize: 22,
        lineHeight: 30,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13.5,
        lineHeight: 20,
        opacity: 0.75,
    },
})
