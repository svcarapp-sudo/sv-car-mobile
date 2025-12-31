import {StyleSheet, View} from 'react-native'
import {Text, Button, useTheme} from 'react-native-paper'

import {useVehicleInfo} from '../hooks'

const ARABIC_TEXT = {
    ENGINE_INFO: 'معلومات المحرك',
    SELECT_ENGINE_DESC: 'اختر سعة المحرك أو النوع',
}

interface EngineScreenProps {
    value: string
    onSelect: (engine: string) => void
    onNext: () => void
}

export const EngineScreen = ({value, onSelect, onNext}: EngineScreenProps) => {
    const {commonEngines} = useVehicleInfo()
    const theme = useTheme()

    const handleSelect = (engine: string) => {
        onSelect(engine)
        onNext()
    }

    return (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.ENGINE_INFO}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.SELECT_ENGINE_DESC}
            </Text>
            <View style={styles.commonEngines}>
                {commonEngines.map(e => (
                    <Button
                        key={e}
                        mode={value === e ? 'contained' : 'outlined'}
                        style={styles.chipButton}
                        onPress={() => handleSelect(e)}>
                        {e}
                    </Button>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        marginBottom: 4,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    stepSubtitle: {
        marginBottom: 24,
        textAlign: 'right',
        opacity: 0.7,
    },
    commonEngines: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    chipButton: {
        borderRadius: 20,
    },
})
