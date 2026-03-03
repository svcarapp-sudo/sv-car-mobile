import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text, useTheme} from 'react-native-paper'

interface QuickActionsProps {
    onBrowseParts: () => void
    onMyParts: () => void
}

const ARABIC_TEXT = {
    QUICK_ACTIONS: 'الإجراءات السريعة',
    BROWSE_PARTS: 'تصفح قطع الغيار',
    MY_PARTS: 'قطع الغيار الخاصة بي',
}

interface ActionTileProps {
    icon: string
    label: string
    onPress: () => void
    accentColor: string
    surfaceColor: string
    textColor: string
    iconContainerColor: string
}

const ActionTile = ({icon, label, onPress, accentColor, surfaceColor, textColor, iconContainerColor}: ActionTileProps) => (
    <TouchableOpacity style={[tileStyles.tile, {backgroundColor: surfaceColor}]} onPress={onPress} activeOpacity={0.7}>
        <View style={[tileStyles.iconCircle, {backgroundColor: iconContainerColor}]}>
            <Icon source={icon} size={24} color={accentColor} />
        </View>
        <Text style={[tileStyles.label, {color: textColor}]} numberOfLines={2}>
            {label}
        </Text>
    </TouchableOpacity>
)

const tileStyles = StyleSheet.create({
    tile: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        shadowColor: '#0F172A',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.1,
        textAlign: 'center',
        lineHeight: 18,
    },
})

export const QuickActions = ({onBrowseParts, onMyParts}: QuickActionsProps) => {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.QUICK_ACTIONS}
                </Text>
                <View style={[styles.titleAccent, {backgroundColor: theme.colors.tertiary}]} />
            </View>
            <View style={styles.tilesRow}>
                <ActionTile
                    icon='wrench-outline'
                    label={ARABIC_TEXT.BROWSE_PARTS}
                    onPress={onBrowseParts}
                    accentColor={theme.colors.primary}
                    surfaceColor={theme.colors.surface}
                    textColor={theme.colors.onSurface}
                    iconContainerColor={theme.colors.primaryContainer}
                />
                <ActionTile
                    icon='package-variant-closed'
                    label={ARABIC_TEXT.MY_PARTS}
                    onPress={onMyParts}
                    accentColor={theme.colors.tertiary}
                    surfaceColor={theme.colors.surface}
                    textColor={theme.colors.onSurface}
                    iconContainerColor='#FEF3C7'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        paddingHorizontal: 4,
        gap: 8,
    },
    sectionTitle: {
        fontWeight: '700',
        letterSpacing: 0,
        lineHeight: 24,
    },
    titleAccent: {
        width: 20,
        height: 3,
        borderRadius: 2,
    },
    tilesRow: {
        flexDirection: 'row',
        gap: 12,
    },
})
