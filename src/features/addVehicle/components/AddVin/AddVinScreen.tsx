import {StyleSheet, ScrollView, View} from 'react-native'
import {Button, Text, HelperText} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {VinInputSection} from './VinInputSection'
import {VehicleDetailsForm} from './VehicleDetailsForm'

const ARABIC_TEXT = {
    VIN_DETAILS: '\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u064a\u0629',
    FINAL_STEP_DESC: '\u0623\u0636\u0641 \u0631\u0642\u0645 \u0627\u0644\u0647\u064a\u0643\u0644 \u0648\u0627\u0633\u0645 \u0645\u0633\u062a\u0639\u0627\u0631 \u0644\u0644\u0645\u0631\u0643\u0628\u0629 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)',
    SUBMIT_BUTTON: '\u062a\u0623\u0643\u064a\u062f \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0631\u0643\u0628\u0629',
}

interface VinScreenProps {
    vin: string
    displayName: string
    onVinChange: (vin: string) => void
    onDisplayNameChange: (displayName: string) => void
    onSubmit: () => void | Promise<void>
    loading?: boolean
    error?: string | null
}

export const AddVinScreen = ({
    vin,
    displayName,
    onVinChange,
    onDisplayNameChange,
    onSubmit,
    loading = false,
    error = null,
}: VinScreenProps) => {
    const theme = useAppTheme()

    return (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.VIN_DETAILS}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.FINAL_STEP_DESC}
                </Text>
            </View>

            <VinInputSection vin={vin} onVinChange={onVinChange} />
            <VehicleDetailsForm displayName={displayName} onDisplayNameChange={onDisplayNameChange} />

            {error ? (
                <HelperText type='error' visible style={styles.errorText}>
                    {error}
                </HelperText>
            ) : null}

            <Button
                mode='contained'
                onPress={onSubmit}
                loading={loading}
                disabled={loading}
                style={styles.submitButton}
                contentStyle={styles.submitButtonContent}
                buttonColor={theme.colors.surfaceDark}
                textColor={theme.colors.onPrimary}
                icon='check-bold'>
                {ARABIC_TEXT.SUBMIT_BUTTON}
            </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 24,
    },
    stepTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    stepSubtitle: {
        opacity: 0.6,
        fontSize: 14,
    },
    errorText: {
        marginTop: 4,
        marginBottom: 4,
    },
    submitButton: {
        marginTop: 24,
        marginBottom: 32,
        borderRadius: 14,
        elevation: 0,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    submitButtonContent: {
        paddingVertical: 8,
    },
})
