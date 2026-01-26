import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text, useTheme} from 'react-native-paper'

interface QuickActionsProps {
    onBrowseParts: () => void
}

const ARABIC_TEXT = {
    QUICK_ACTIONS: 'الإجراءات السريعة',
    BROWSE_PARTS: 'تصفح قطع الغيار',
    MY_ORDERS: 'طلباتي',
    SERVICE_HISTORY: 'سجل الصيانة',
}

export const QuickActions = ({onBrowseParts}: QuickActionsProps) => {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.QUICK_ACTIONS}
            </Text>
            <View style={styles.actionsRow}>
                <Button
                    mode='contained'
                    onPress={onBrowseParts}
                    style={[styles.actionButton, {backgroundColor: theme.colors.primary}]}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                    icon='wrench'
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    elevation={2}>
                    {ARABIC_TEXT.BROWSE_PARTS}
                </Button>
                <View style={styles.secondaryActions}>
                    <Button
                        mode='outlined'
                        onPress={() => {}}
                        style={[styles.secondaryButton, {borderColor: theme.colors.outline}]}
                        icon='history'
                        contentStyle={styles.secondaryButtonContent}
                        labelStyle={[styles.secondaryButtonLabel, {color: theme.colors.onSurface}]}
                        rippleColor={theme.colors.primaryContainer}>
                        {ARABIC_TEXT.SERVICE_HISTORY}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
    },
    title: {
        marginBottom: 16,
        fontWeight: '700',
        textAlign: 'right',
        letterSpacing: 0.15,
    },
    actionsRow: {
        flexDirection: 'column',
        gap: 12,
    },
    actionButton: {
        borderRadius: 20,
        elevation: 2,
    },
    buttonContent: {
        paddingVertical: 12,
        flexDirection: 'row-reverse',
    },
    buttonLabel: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
    secondaryActions: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        borderRadius: 16,
        borderWidth: 1,
    },
    secondaryButtonContent: {
        paddingVertical: 10,
        flexDirection: 'row-reverse',
    },
    secondaryButtonLabel: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
})
