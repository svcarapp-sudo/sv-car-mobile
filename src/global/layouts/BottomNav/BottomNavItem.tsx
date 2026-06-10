import {useEffect, useRef} from 'react'
import {Animated, Pressable, StyleSheet} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

interface BottomNavItemProps {
    icon: string
    activeIcon: string
    label: string
    active: boolean
    onPress: () => void
}

export const BottomNavItem = ({icon, activeIcon, label, active, onPress}: BottomNavItemProps) => {
    const theme = useAppTheme()
    const pop = useRef(new Animated.Value(1)).current

    // Springy pill pop when the tab becomes active — small, fast, alive.
    useEffect(() => {
        if (!active) return
        pop.setValue(0.8)
        Animated.spring(pop, {toValue: 1, speed: 30, bounciness: 9, useNativeDriver: true}).start()
    }, [active, pop])

    return (
        <Pressable
            style={styles.navItem}
            onPress={onPress}
            hitSlop={{top: 8, bottom: 8}}
            accessibilityRole='tab'
            accessibilityLabel={label}
            accessibilityState={{selected: active}}>
            <Animated.View
                style={[
                    styles.iconPill,
                    active && [styles.iconPillActive, {backgroundColor: theme.colors.primaryContainer}],
                    {transform: [{scale: pop}]},
                ]}>
                <Icon
                    source={active ? activeIcon : icon}
                    size={22}
                    color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                />
            </Animated.View>
            <Text
                style={[
                    styles.label,
                    {
                        color: active ? theme.colors.primary : theme.colors.onSurfaceVariant,
                        fontWeight: active ? '700' : '400',
                    },
                ]}>
                {label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        minHeight: 48,
    },
    iconPill: {
        width: 52,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
    },
    iconPillActive: {
        width: 56,
        height: 30,
        borderRadius: 15,
    },
    label: {
        fontSize: 10,
        textAlign: 'center',
        letterSpacing: 0.1,
    },
})
