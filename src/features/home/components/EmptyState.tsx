import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, IconButton, Text, useTheme} from 'react-native-paper'

interface EmptyStateProps {
    onAddVehicle: () => void
}

const ARABIC_TEXT = {
    NO_VEHICLE: 'لم يتم إضافة مركبة',
    ADD_VEHICLE_DESC: 'أضف مركبتك للعثور على قطع الغيار المتوافقة وإدارة معلومات سيارتك',
    ADD_MY_VEHICLE: 'إضافة مركبتي',
}

export const EmptyState = ({onAddVehicle}: EmptyStateProps) => {
    const theme = useTheme()

    return (
        <View style={styles.emptyContainer}>
            <View style={[styles.iconContainer, {backgroundColor: theme.colors.primaryContainer}]}>
                <IconButton icon='car-outline' size={64} iconColor={theme.colors.primary} />
            </View>
            <Text variant='headlineSmall' style={styles.emptyTitle}>
                {ARABIC_TEXT.NO_VEHICLE}
            </Text>
            <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                {ARABIC_TEXT.ADD_VEHICLE_DESC}
            </Text>
            <Button
                mode='contained'
                onPress={onAddVehicle}
                style={styles.addButton}
                contentStyle={styles.addButtonContent}
                labelStyle={styles.addButtonLabel}>
                {ARABIC_TEXT.ADD_MY_VEHICLE}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        marginBottom: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 40,
        lineHeight: 22,
    },
    addButton: {
        borderRadius: 12,
        width: '100%',
        maxWidth: 250,
    },
    addButtonContent: {
        paddingVertical: 8,
    },
    addButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})
