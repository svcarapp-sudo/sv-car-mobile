import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import type {CompatibilityResponse} from '@/global/types'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    COMPATIBILITY: 'التوافق',
    PERFECT_MATCH: 'مطابقة تماماً',
    COMPATIBLE: 'متوافقة',
    NOT_COMPATIBLE: 'غير متوافقة',
}

interface PartDetailCompatProps {
    compatibility: CompatibilityResponse
}

export const PartDetailCompat = ({compatibility}: PartDetailCompatProps) => {
    const theme = useAppTheme()

    const getCompatLabel = () => {
        if (compatibility.isCompatible && compatibility.exactMatch) {
            return ARABIC_TEXT.PERFECT_MATCH
        }
        if (compatibility.isCompatible) {
            return ARABIC_TEXT.COMPATIBLE
        }
        return ARABIC_TEXT.NOT_COMPATIBLE
    }

    return (
        <View style={[styles.sectionCard, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.sectionHeader}>
                <View
                    style={[
                        styles.sectionIconBox,
                        {
                            backgroundColor: compatibility.isCompatible ? theme.colors.successContainer : theme.colors.errorContainer,
                        },
                    ]}>
                    <Icon
                        source={compatibility.isCompatible ? 'check-circle-outline' : 'close-circle-outline'}
                        size={16}
                        color={compatibility.isCompatible ? theme.colors.success : theme.colors.errorDark}
                    />
                </View>
                <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.COMPATIBILITY}
                </Text>
            </View>
            <View
                style={[
                    styles.compatBadge,
                    {
                        backgroundColor: compatibility.isCompatible ? theme.colors.successContainer : theme.colors.errorContainer,
                    },
                ]}>
                <Icon
                    source={compatibility.isCompatible ? 'check-circle' : 'close-circle'}
                    size={18}
                    color={compatibility.isCompatible ? theme.colors.success : theme.colors.errorDark}
                />
                <Text style={[styles.compatText, {color: compatibility.isCompatible ? theme.colors.success : theme.colors.errorDark}]}>
                    {getCompatLabel()}
                </Text>
            </View>
            {compatibility.reason && (
                <Text style={[styles.compatReason, {color: theme.colors.onSurfaceVariant}]}>
                    {compatibility.reason}
                </Text>
            )}
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
    compatBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        marginBottom: 8,
    },
    compatText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
    compatReason: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.7,
        marginTop: 4,
    },
})
