import {StyleSheet, View} from 'react-native'
import {TextInput, Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    NICKNAME_LABEL: 'اسم مستعار',
    NICKNAME_SUBLABEL: 'اسم مميز للمركبة',
    NICKNAME_PLACEHOLDER: 'مثلاً: سيارتي اليومية',
    OPTIONAL: 'اختياري',
}

interface VehicleDetailsFormProps {
    displayName: string
    onDisplayNameChange: (displayName: string) => void
}

export const VehicleDetailsForm = ({displayName, onDisplayNameChange}: VehicleDetailsFormProps) => {
    const theme = useAppTheme()

    return (
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
    )
}

const styles = StyleSheet.create({
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
})
