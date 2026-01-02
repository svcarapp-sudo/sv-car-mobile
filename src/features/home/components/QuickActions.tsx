import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Text, useTheme} from 'react-native-paper'

interface QuickActionsProps {
    onBrowseParts: () => void
}

const ARABIC_TEXT = {
    QUICK_ACTIONS: 'الإجراءات السريعة',
    BROWSE_PARTS: 'تصفح قطع الغيار',
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
                    style={styles.actionButton}
                    icon='wrench'
                    contentStyle={styles.buttonContent}>
                    {ARABIC_TEXT.BROWSE_PARTS}
                </Button>
                {/* Add more quick actions here in the future */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    title: {
        marginBottom: 12,
        fontWeight: 'bold',
    },
    actionsRow: {
        flexDirection: 'row-reverse',
    },
    actionButton: {
        borderRadius: 12,
        flex: 1,
    },
    buttonContent: {
        paddingVertical: 8,
        flexDirection: 'row-reverse',
    },
})
