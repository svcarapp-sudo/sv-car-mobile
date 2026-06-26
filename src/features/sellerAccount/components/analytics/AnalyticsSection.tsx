import type {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'

interface AnalyticsSectionProps {
    title: string
    children: ReactNode
    /** Render children inside a raised surface card (default true). */
    card?: boolean
}

/** A titled block; optionally wraps its body in a soft surface card. */
export const AnalyticsSection = ({title, children, card = true}: AnalyticsSectionProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.section}>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {title}
            </Text>
            {card ? <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>{children}</View> : children}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {gap: 12},
    title: {fontWeight: '700'},
    card: {borderRadius: 16, padding: 16, ...shadows.sm, shadowColor: themeColors.shadow},
})
