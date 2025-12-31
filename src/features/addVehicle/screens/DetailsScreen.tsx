import {StyleSheet, ScrollView} from 'react-native'
import {TextInput, Button, Text, Card, List, useTheme} from 'react-native-paper'

const ARABIC_TEXT = {
    ALMOST_DONE: 'أوشكنا على الانتهاء!',
    FINAL_DETAILS_DESC: (year: string, make: string, model: string) => `أضف التفاصيل النهائية لسيارتك ${year} ${make} ${model}`,
    VIN_LABEL: 'رقم الهيكل (اختياري)',
    VIN_PLACEHOLDER: 'رقم تعريف المركبة',
    NICKNAME_LABEL: 'اسم مستعار (اختياري)',
    NICKNAME_PLACEHOLDER: 'مثلاً، سيارتي اليومية',
    SUMMARY: 'الملخص',
    VEHICLE_LABEL: 'المركبة:',
    ENGINE_LABEL: 'المحرك:',
    SUBMIT_BUTTON: 'تأكيد وإضافة المركبة',
}

interface DetailsScreenProps {
    make: string
    model: string
    year: string
    fuelType: string
    engine: string
    vin: string
    displayName: string
    onVinChange: (vin: string) => void
    onDisplayNameChange: (displayName: string) => void
    onSubmit: () => void
}

export const DetailsScreen = ({
    make,
    model,
    year,
    fuelType,
    engine,
    vin,
    displayName,
    onVinChange,
    onDisplayNameChange,
    onSubmit,
}: DetailsScreenProps) => {
    const theme = useTheme()

    return (
        <ScrollView style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.ALMOST_DONE}
            </Text>
            <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.FINAL_DETAILS_DESC(year, make, model)}
            </Text>

            <TextInput
                label={ARABIC_TEXT.VIN_LABEL}
                value={vin}
                onChangeText={onVinChange}
                mode='outlined'
                style={styles.input}
                placeholder={ARABIC_TEXT.VIN_PLACEHOLDER}
            />

            <TextInput
                label={ARABIC_TEXT.NICKNAME_LABEL}
                value={displayName}
                onChangeText={onDisplayNameChange}
                mode='outlined'
                style={styles.input}
                placeholder={ARABIC_TEXT.NICKNAME_PLACEHOLDER}
            />

            <Card style={[styles.summaryCard, {backgroundColor: theme.colors.surfaceVariant}]}>
                <Card.Title
                    title={ARABIC_TEXT.SUMMARY}
                    titleStyle={{color: theme.colors.onSurfaceVariant}}
                    left={props => <List.Icon {...props} icon='information' color={theme.colors.primary} />}
                />
                <Card.Content>
                    <Text style={{color: theme.colors.onSurfaceVariant}}>
                        <Text style={{fontWeight: 'bold'}}>{ARABIC_TEXT.VEHICLE_LABEL}</Text> {year} {make} {model}
                    </Text>
                    <Text style={{color: theme.colors.onSurfaceVariant}}>
                        <Text style={{fontWeight: 'bold'}}>{ARABIC_TEXT.ENGINE_LABEL}</Text> {engine} ({fuelType})
                    </Text>
                </Card.Content>
            </Card>

            <Button mode='contained' onPress={onSubmit} style={styles.submitButton}>
                {ARABIC_TEXT.SUBMIT_BUTTON}
            </Button>
        </ScrollView>
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
    input: {
        marginBottom: 16,
    },
    summaryCard: {
        marginTop: 16,
    },
    submitButton: {
        marginTop: 24,
        paddingVertical: 8,
    },
})
