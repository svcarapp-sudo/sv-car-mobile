import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    DESCRIPTION: 'الوصف',
}

interface PartDetailDescriptionProps {
    description: string
}

export const PartDetailDescription = ({description}: PartDetailDescriptionProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.sectionCard, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconBox, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source='text-box-outline' size={16} color={theme.colors.primary} />
                </View>
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.DESCRIPTION}</Text>
            </View>
            <Text style={[styles.sectionBody, {color: theme.colors.onSurfaceVariant}]}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },
    sectionIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.1,
    },
    sectionBody: {
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: 0.1,
    },
})
