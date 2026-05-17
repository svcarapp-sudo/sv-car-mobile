import React, {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    SUBTITLE: 'إدارة سيارتك وقطع الغيار في مكان واحد',
}

const greet = (hour: number) => {
    if (hour < 5) return 'مساء الخير'
    if (hour < 12) return 'صباح الخير'
    if (hour < 18) return 'نهارك سعيد'
    return 'مساء الخير'
}

const firstName = (name?: string | null) => {
    if (!name) return ''
    const trimmed = name.trim()
    if (!trimmed) return ''
    return trimmed.split(' ')[0]
}

interface HomeGreetingProps {
    name?: string | null
}

export const HomeGreeting = ({name}: HomeGreetingProps) => {
    const salutation = useMemo(() => greet(new Date().getHours()), [])
    const display = firstName(name)
    const heading = display ? `${salutation}، ${display}` : salutation

    return (
        <View style={styles.wrapper}>
            <View style={styles.titleRow}>
                <View style={styles.dot} />
                <Text style={styles.eyebrow}>سيارتي</Text>
            </View>
            <Text style={styles.heading} numberOfLines={1}>
                {heading}
            </Text>
            <Text style={styles.subtitle}>{ARABIC_TEXT.SUBTITLE}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 4,
        paddingTop: 14,
        paddingBottom: 18,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: themeColors.tertiary,
    },
    eyebrow: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: themeColors.onDarkMedium,
        textTransform: 'uppercase',
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        lineHeight: 34,
        color: themeColors.onDarkHigh,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 20,
        marginTop: 4,
        color: themeColors.onDarkMedium,
    },
})
