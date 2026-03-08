import {StyleSheet, ScrollView, View} from 'react-native'
import {TextInput, Button, Text, Icon, HelperText} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    VIN_DETAILS: 'التفاصيل الإضافية',
    FINAL_STEP_DESC: 'أضف رقم الهيكل واسم مستعار للمركبة (اختياري)',
    VIN_LABEL: 'رقم الهيكل (VIN)',
    VIN_SUBLABEL: 'رقم تعريف المركبة - 17 حرف',
    VIN_PLACEHOLDER: 'مثال: 1HGBH41JXMN109186',
    NICKNAME_LABEL: 'اسم مستعار',
    NICKNAME_SUBLABEL: 'اسم مميز للمركبة',
    NICKNAME_PLACEHOLDER: 'مثلاً: سيارتي اليومية',
    SUBMIT_BUTTON: 'تأكيد وإضافة المركبة',
    OPTIONAL: 'اختياري',
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

            {/* VIN Field */}
            <View style={[styles.fieldCard, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.fieldHeader}>
                    <View style={styles.fieldIconWrap}>
                        <Icon source='barcode' size={18} color={theme.colors.tertiary} />
                    </View>
                    <View style={styles.fieldHeaderText}>
                        <View style={styles.fieldLabelRow}>
                            <Text variant='titleSmall' style={[styles.fieldLabel, {color: theme.colors.onSurface}]}>
                                {ARABIC_TEXT.VIN_LABEL}
                            </Text>
                            <View style={styles.optionalBadge}>
                                <Text style={styles.optionalText}>{ARABIC_TEXT.OPTIONAL}</Text>
                            </View>
                        </View>
                        <Text variant='bodySmall' style={[styles.fieldSublabel, {color: theme.colors.onSurfaceVariant}]}>
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
                    outlineStyle={styles.inputOutline}
                    outlineColor={theme.colors.outline}
                    activeOutlineColor={theme.colors.tertiary}
                    dense
                />
            </View>

            {/* Nickname Field */}
            <View style={[styles.fieldCard, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.fieldHeader}>
                    <View style={styles.fieldIconWrap}>
                        <Icon source='label-outline' size={18} color={theme.colors.tertiary} />
                    </View>
                    <View style={styles.fieldHeaderText}>
                        <View style={styles.fieldLabelRow}>
                            <Text variant='titleSmall' style={[styles.fieldLabel, {color: theme.colors.onSurface}]}>
                                {ARABIC_TEXT.NICKNAME_LABEL}
                            </Text>
                            <View style={styles.optionalBadge}>
                                <Text style={styles.optionalText}>{ARABIC_TEXT.OPTIONAL}</Text>
                            </View>
                        </View>
                        <Text variant='bodySmall' style={[styles.fieldSublabel, {color: theme.colors.onSurfaceVariant}]}>
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
                    outlineStyle={styles.inputOutline}
                    outlineColor={theme.colors.outline}
                    activeOutlineColor={theme.colors.tertiary}
                    dense
                />
            </View>

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
    fieldCard: {
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    fieldHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    fieldIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: themeColors.accentGlow,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    fieldHeaderText: {
        flex: 1,
        alignItems: 'flex-start',
    },
    fieldLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    fieldLabel: {
        fontWeight: '600',
    },
    fieldSublabel: {
        opacity: 0.6,
        fontSize: 12,
    },
    optionalBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: themeColors.accentGlow,
    },
    optionalText: {
        fontSize: 9,
        fontWeight: '600',
        color: themeColors.tertiary,
    },
    input: {
        backgroundColor: 'transparent',
    },
    inputOutline: {
        borderRadius: 12,
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
