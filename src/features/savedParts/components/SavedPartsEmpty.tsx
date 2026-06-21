import {useEffect, useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {IllustrationEmptyParts} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {resetMainTo} from '@/global/navigation/navActions'
import {themeColors} from '@/global/theme'

const ARABIC_TEXT = {
    TITLE: 'لا توجد قطع في المفضلة بعد',
    SUBTITLE: 'اضغط على القلب ♡ لحفظ القطع التي تهمك ومراجعتها لاحقًا',
    BROWSE: 'تصفح القطع',
}

export const SavedPartsEmpty = () => {
    const theme = useAppTheme()
    const fadeIn = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeIn, {toValue: 1, duration: 400, useNativeDriver: true}).start()
    }, [fadeIn])

    return (
        <Animated.View style={[styles.container, {opacity: fadeIn}]}>
            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                <IllustrationEmptyParts size={180} />
                <Text style={[styles.title, {color: theme.colors.onSurface}]}>{ARABIC_TEXT.TITLE}</Text>
                <Text style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.SUBTITLE}</Text>
                <Button
                    mode='contained'
                    onPress={() => resetMainTo('PartsCategories')}
                    icon='compass-outline'
                    style={styles.actionButton}
                    contentStyle={styles.actionButtonContent}
                    labelStyle={styles.actionButtonLabel}
                    buttonColor={theme.colors.primary}>
                    {ARABIC_TEXT.BROWSE}
                </Button>
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
    actionButtonContent: {paddingVertical: 8},
    actionButtonLabel: {fontSize: 14, fontWeight: '600'},
})
