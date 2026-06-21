import {StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'

export type YearRole = 'idle' | 'start' | 'end' | 'middle' | 'single'

const A11Y: Record<YearRole, (y: number) => string> = {
    idle: y => `${y}`,
    single: y => `${y}، محدد`,
    start: y => `${y}، بداية المدى، محدد`,
    end: y => `${y}، نهاية المدى، محدد`,
    middle: y => `${y}، ضمن المدى`,
}

interface YearChipProps {
    year: number
    role: YearRole
    onPress: () => void
}

/** A single year cell with booking-app range roles: filled amber endpoints, a
 * lighter tinted middle, and plain idle cells. */
export const YearChip = ({year, role, onPress}: YearChipProps) => {
    const theme = useAppTheme()
    const endpoint = role === 'start' || role === 'end' || role === 'single'
    const middle = role === 'middle'

    return (
        <PressableScale
            withHaptic
            onPress={onPress}
            containerStyle={styles.wrap}
            style={[
                styles.chip,
                {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                middle && {backgroundColor: theme.colors.accentSoft, borderColor: theme.colors.accentSoft},
                endpoint && {backgroundColor: theme.colors.tertiary, borderColor: theme.colors.tertiary},
            ]}
            accessibilityRole='button'
            accessibilityState={{selected: role !== 'idle'}}
            accessibilityLabel={A11Y[role](year)}>
            <Text style={[styles.text, {color: endpoint ? theme.colors.onPrimary : theme.colors.onSurface}]}>{year}</Text>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    wrap: {flex: 1, aspectRatio: 2, margin: 5},
    chip: {flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12, borderWidth: 1.5},
    text: {fontSize: 15, fontWeight: '700', writingDirection: 'ltr'},
})
