import {StyleSheet, View, TouchableOpacity} from 'react-native'
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

    return (
        <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.iconPill, active && [styles.iconPillActive, {backgroundColor: theme.colors.primaryContainer}]]}>
                <Icon
                    source={active ? activeIcon : icon}
                    size={22}
                    color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
                />
            </View>
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
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
