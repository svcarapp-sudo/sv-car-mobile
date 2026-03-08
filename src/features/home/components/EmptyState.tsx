import React, {useEffect, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {Button, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

interface EmptyStateProps {
    onAddVehicle: () => void
}

const ARABIC_TEXT = {
    NO_VEHICLE: 'لم يتم إضافة مركبة',
    ADD_VEHICLE_DESC: 'أضف مركبتك للعثور على قطع الغيار المتوافقة وإدارة معلومات سيارتك',
    ADD_MY_VEHICLE: 'إضافة مركبتي',
}

export const EmptyState = ({onAddVehicle}: EmptyStateProps) => {
    const theme = useAppTheme()

    const pulseAnim = useRef(new Animated.Value(1)).current
    const fadeIn = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start()

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [fadeIn, pulseAnim])

    return (
        <Animated.View style={[styles.emptyContainer, {opacity: fadeIn}]}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                {/* Pulsing Icon */}
                <Animated.View style={[styles.iconOuter, {transform: [{scale: pulseAnim}]}]}>
                    <View style={[styles.iconRing, {borderColor: theme.colors.primaryContainer}]}>
                        <View style={[styles.iconCore, {backgroundColor: theme.colors.primary}]}>
                            <Icon source='car-outline' size={44} color={theme.colors.onPrimary} />
                        </View>
                    </View>
                </Animated.View>

                {/* Text */}
                <View style={styles.textContainer}>
                    <Text variant='headlineSmall' style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.NO_VEHICLE}
                    </Text>
                    <Text variant='bodyMedium' style={[styles.emptyText, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC_TEXT.ADD_VEHICLE_DESC}
                    </Text>
                </View>

                {/* CTA */}
                <Button
                    mode='contained'
                    onPress={onAddVehicle}
                    style={styles.addButton}
                    contentStyle={styles.addButtonContent}
                    labelStyle={styles.addButtonLabel}
                    buttonColor={theme.colors.tertiary}
                    textColor={theme.colors.onTertiary}
                    icon='plus-circle-outline'>
                    {ARABIC_TEXT.ADD_MY_VEHICLE}
                </Button>

                {/* Decorative accent line */}
                <View style={[styles.accentLine, {backgroundColor: theme.colors.tertiary}]} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        minHeight: 380,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 28,
        padding: 36,
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    iconOuter: {
        marginBottom: 28,
    },
    iconRing: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCore: {
        width: 88,
        height: 88,
        borderRadius: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 28,
        width: '100%',
    },
    emptyTitle: {
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 32,
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0.15,
        opacity: 0.75,
        paddingHorizontal: 8,
    },
    addButton: {
        borderRadius: 16,
        width: '100%',
        elevation: 0,
    },
    addButtonContent: {
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    addButtonLabel: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.1,
    },
    accentLine: {
        position: 'absolute',
        bottom: 0,
        start: 0,
        end: 0,
        height: 4,
    },
})
