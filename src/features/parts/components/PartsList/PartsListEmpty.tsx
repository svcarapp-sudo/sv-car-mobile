import React, {useEffect, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Text} from 'react-native-paper'

import {IllustrationEmptyParts} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {NavigationProp} from '@react-navigation/native'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    NO_PARTS_FOUND: 'لم يتم العثور على قطع',
    NO_PARTS_IN_CATEGORY: (category: string) => `لم يتم العثور على قطع في فئة "${category}"`,
    NO_PARTS_VEHICLE: 'لا توجد قطع متاحة لهذه المركبة',
    ADD_VEHICLE: 'إضافة مركبة',
    LOADING: 'جاري تحميل القطع...',
}

interface PartsListEmptyProps {
    loading: boolean
    categoryName?: string | null
    navigation?: NavigationProp<RootStackParamList>
}

export const PartsListEmpty = ({loading, categoryName, navigation}: PartsListEmptyProps) => {
    const theme = useAppTheme()
    const fadeIn = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (!loading) {
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start()
        }
    }, [loading, fadeIn])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={theme.colors.primary} />
                <Text style={[styles.loadingText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.LOADING}</Text>
            </View>
        )
    }

    return (
        <Animated.View style={[styles.container, {opacity: fadeIn}]}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <IllustrationEmptyParts size={170} />

                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.NO_PARTS_FOUND}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {categoryName ? ARABIC_TEXT.NO_PARTS_IN_CATEGORY(categoryName) : ARABIC_TEXT.NO_PARTS_VEHICLE}
                </Text>

                {!categoryName && (
                    <Button
                        mode='contained'
                        onPress={() => navigation?.navigate('AddVehicle')}
                        icon='car-outline'
                        style={styles.actionButton}
                        contentStyle={styles.actionButtonContent}
                        labelStyle={styles.actionButtonLabel}
                        buttonColor={theme.colors.primary}>
                        {ARABIC_TEXT.ADD_VEHICLE}
                    </Button>
                )}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        minHeight: 380,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.2,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
        opacity: 0.7,
        marginBottom: 24,
    },
    actionButton: {
        borderRadius: 14,
        width: '100%',
    },
    actionButtonContent: {
        paddingVertical: 8,
    },
    actionButtonLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 14,
        letterSpacing: 0.1,
    },
})
