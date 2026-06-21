import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface AddPartRequestStepHeaderProps {
    title: string
    subtitle?: string
}

/** Per-step headline + subtitle, sitting under the progress bar. */
export const AddPartRequestStepHeader = ({title, subtitle}: AddPartRequestStepHeaderProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: theme.colors.onSurface}]}>{title}</Text>
            {subtitle ? <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{subtitle}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {marginBottom: 16},
    title: {fontSize: 21, fontWeight: '800', letterSpacing: -0.4, lineHeight: 28},
    subtitle: {fontSize: 13, lineHeight: 19, marginTop: 4, opacity: 0.8},
})
