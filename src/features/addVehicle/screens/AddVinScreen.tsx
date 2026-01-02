import {StyleSheet, ScrollView, View} from 'react-native'
import {TextInput, Button, Text, Card, List, useTheme} from 'react-native-paper'

const ARABIC_TEXT = {
    VIN_DETAILS: 'رقم الهيكل والتفاصيل',
    FINAL_STEP_DESC: 'أضف رقم الهيكل واسم مستعار للمركبة (اختياري)',
    VIN_LABEL: 'رقم الهيكل',
    VIN_SUBLABEL: 'رقم تعريف المركبة (VIN) - اختياري',
    VIN_PLACEHOLDER: 'أدخل رقم الهيكل المكون من 17 حرف',
    NICKNAME_LABEL: 'اسم مستعار',
    NICKNAME_SUBLABEL: 'اسم مميز للمركبة - اختياري',
    NICKNAME_PLACEHOLDER: 'مثلاً: سيارتي اليومية',
    SUBMIT_BUTTON: 'تأكيد وإضافة المركبة',
}

interface VinScreenProps {
    vin: string
    displayName: string
    onVinChange: (vin: string) => void
    onDisplayNameChange: (displayName: string) => void
    onSubmit: () => void
}

export const AddVinScreen = ({vin, displayName, onVinChange, onDisplayNameChange, onSubmit}: VinScreenProps) => {
    const theme = useTheme()

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

            <Card
                style={[styles.inputCard, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outline}]}
                mode='outlined'>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.inputHeader}>
                        <List.Icon icon='barcode' color={theme.colors.primary} />
                        <View style={styles.inputHeaderText}>
                            <Text variant='titleMedium' style={[styles.inputLabel, {color: theme.colors.onSurface}]}>
                                {ARABIC_TEXT.VIN_LABEL}
                            </Text>
                            <Text variant='bodySmall' style={[styles.inputSublabel, {color: theme.colors.onSurfaceVariant}]}>
                                {ARABIC_TEXT.VIN_SUBLABEL}
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        value={vin}
                        onChangeText={onVinChange}
                        mode='outlined'
                        placeholder={ARABIC_TEXT.VIN_PLACEHOLDER}
                        style={styles.input}
                        autoCapitalize='characters'
                        maxLength={17}
                        left={<TextInput.Icon icon='numeric' />}
                    />
                </Card.Content>
            </Card>

            <Card
                style={[styles.inputCard, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outline}]}
                mode='outlined'>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.inputHeader}>
                        <List.Icon icon='label-outline' color={theme.colors.primary} />
                        <View style={styles.inputHeaderText}>
                            <Text variant='titleMedium' style={[styles.inputLabel, {color: theme.colors.onSurface}]}>
                                {ARABIC_TEXT.NICKNAME_LABEL}
                            </Text>
                            <Text variant='bodySmall' style={[styles.inputSublabel, {color: theme.colors.onSurfaceVariant}]}>
                                {ARABIC_TEXT.NICKNAME_SUBLABEL}
                            </Text>
                        </View>
                    </View>
                    <TextInput
                        value={displayName}
                        onChangeText={onDisplayNameChange}
                        mode='outlined'
                        placeholder={ARABIC_TEXT.NICKNAME_PLACEHOLDER}
                        style={styles.input}
                        left={<TextInput.Icon icon='pencil-outline' />}
                    />
                </Card.Content>
            </Card>

            <Button mode='contained' onPress={onSubmit} style={styles.submitButton} contentStyle={styles.submitButtonContent}>
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
        marginBottom: 4,
        fontWeight: 'bold',
    },
    stepSubtitle: {
        opacity: 0.7,
    },
    inputCard: {
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
    },
    cardContent: {
        paddingTop: 8,
    },
    inputHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 12,
    },
    inputHeaderText: {
        flex: 1,
        marginRight: 8,
        alignItems: 'flex-start',
    },
    inputLabel: {
        fontWeight: '600',
        marginBottom: 2,
    },
    inputSublabel: {
        opacity: 0.7,
    },
    input: {
        marginBottom: 0,
        textAlign: 'right',
    },
    submitButton: {
        marginTop: 24,
        marginBottom: 24,
        borderRadius: 12,
    },
    submitButtonContent: {
        paddingVertical: 8,
    },
})
