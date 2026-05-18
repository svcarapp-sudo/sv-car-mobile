import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    TITLE: 'المفضلة',
    SUBTITLE_ONE: 'قطعة محفوظة',
    SUBTITLE_OTHER: 'قطع محفوظة',
}

interface SavedPartsHeaderProps {
    total: number
}

export const SavedPartsHeader = ({total}: SavedPartsHeaderProps) => {
    const theme = useAppTheme()
    const subtitleLabel = total === 1 ? ARABIC_TEXT.SUBTITLE_ONE : ARABIC_TEXT.SUBTITLE_OTHER

    return (
        <View style={styles.wrap}>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
            <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                {total} {subtitleLabel}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 14,
        gap: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.1,
        opacity: 0.8,
    },
})
