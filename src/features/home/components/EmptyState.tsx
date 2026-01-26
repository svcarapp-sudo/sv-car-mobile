import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Card, IconButton, Text, useTheme} from 'react-native-paper'

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
            <Card style={[styles.card, {backgroundColor: theme.colors.surface}]} contentStyle={styles.cardContent}>
                <View style={styles.content}>
                    <View style={[styles.iconWrapper, {backgroundColor: theme.colors.primaryContainer}]}>
                        <View style={[styles.iconContainer, {backgroundColor: theme.colors.primary}]}>
                            <IconButton
                                icon='car-outline'
                                size={48}
                                iconColor={theme.colors.onPrimary}
                                style={styles.iconButton}
                            />
                        </View>
                    </View>

                    <View style={styles.textContainer}>
                        <Text variant='headlineSmall' style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
                            {ARABIC_TEXT.NO_VEHICLE}
                        </Text>
                        <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                            {ARABIC_TEXT.ADD_VEHICLE_DESC}
                        </Text>
                    </View>

                    <Button
                        mode='contained'
                        onPress={onAddVehicle}
                        style={styles.addButton}
                        contentStyle={styles.addButtonContent}
                        labelStyle={styles.addButtonLabel}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        icon='plus-circle-outline'>
                        {ARABIC_TEXT.ADD_MY_VEHICLE}
                    </Button>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
        minHeight: 400,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 28,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        // Android shadow
        elevation: 2,
    },
    cardContent: {
        padding: 0,
    },
    content: {
        padding: 32,
        alignItems: 'center',
    },
    iconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        padding: 8,
    },
    iconContainer: {
        width: 104,
        height: 104,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        margin: 0,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    emptyTitle: {
        textAlign: 'center',
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 32,
        marginBottom: 12,
    },
    emptyText: {
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0.25,
        opacity: 0.87,
        paddingHorizontal: 16,
    },
    addButton: {
        borderRadius: 28,
        width: '100%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addButtonContent: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    addButtonLabel: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.15,
    },
})
