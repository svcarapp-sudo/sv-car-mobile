import {useEffect, useRef} from 'react'
import {Animated, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import {haptics} from '@/global/utils'

const ARABIC_TEXT = {
    SAVE: 'حفظ في المفضلة',
    UNSAVE: 'إزالة من المفضلة',
}

interface SaveButtonProps {
    saved: boolean
    onPress: () => void
    size?: 'sm' | 'md'
    floating?: boolean
}

export const SaveButton = ({saved, onPress, size = 'md', floating}: SaveButtonProps) => {
    const theme = useAppTheme()
    const dim = size === 'sm' ? 30 : 42
    const iconSize = size === 'sm' ? 16 : 22
    const scale = useRef(new Animated.Value(1)).current
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        Animated.sequence([
            Animated.timing(scale, {toValue: 1.25, duration: 120, useNativeDriver: true}),
            Animated.timing(scale, {toValue: 1, duration: 120, useNativeDriver: true}),
        ]).start()
    }, [saved, scale])

    const handlePress = () => {
        haptics.light()
        onPress()
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            hitSlop={8}
            accessibilityRole='button'
            accessibilityLabel={saved ? ARABIC_TEXT.UNSAVE : ARABIC_TEXT.SAVE}>
            <Animated.View
                style={[
                    styles.btn,
                    floating && shadows.sm,
                    {
                        width: dim,
                        height: dim,
                        backgroundColor: floating ? theme.colors.surface : theme.colors.surfaceContainer,
                        borderColor: theme.colors.outlineVariant,
                        transform: [{scale}],
                    },
                ]}>
                <Icon
                    source={saved ? 'heart' : 'heart-outline'}
                    size={iconSize}
                    color={saved ? theme.colors.error : theme.colors.onSurfaceVariant}
                />
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
})
