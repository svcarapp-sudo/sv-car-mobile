import {StyleSheet, View} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {OriginApi} from '@/global/services'
import {shadows} from '@/global/theme'

interface OriginCardProps {
    item: OriginApi
    index: number
    isSelected: boolean
    onPress: (origin: OriginApi) => void
}

const initialOf = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return '•'
    return trimmed.charAt(0).toUpperCase()
}

export const OriginCard = ({item, isSelected, onPress}: OriginCardProps) => {
    const theme = useAppTheme()
    const initial = initialOf(item.name)

    return (
        <PressableScale
            onPress={() => onPress(item)}
            withHaptic
            containerStyle={styles.cardContainer}
            style={[
                styles.card,
                {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant},
                isSelected && {backgroundColor: theme.colors.accentSubtle, borderColor: theme.colors.tertiary},
                shadows.sm,
            ]}>
            <View
                style={[
                    styles.avatar,
                    {backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outlineVariant},
                    isSelected && {backgroundColor: theme.colors.tertiary, borderColor: theme.colors.tertiary},
                ]}>
                <Text
                    style={[
                        styles.avatarLetter,
                        {color: theme.colors.onSurfaceVariant},
                        isSelected && {color: theme.colors.onPrimary},
                    ]}>
                    {initial}
                </Text>
            </View>
            <View style={styles.body}>
                <Text variant='labelSmall' style={[styles.eyebrow, {color: theme.colors.onSurfaceVariant}]}>
                    منشأ المركبة
                </Text>
                <Text
                    variant='titleMedium'
                    style={[styles.name, {color: theme.colors.onSurface}, isSelected && {fontWeight: '800'}]}
                    numberOfLines={1}>
                    {item.name}
                </Text>
            </View>
            <View
                style={[
                    styles.action,
                    {backgroundColor: theme.colors.surfaceVariant},
                    isSelected && {backgroundColor: theme.colors.tertiary},
                ]}>
                <Icon
                    source={isSelected ? 'check' : 'chevron-left'}
                    size={16}
                    color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                />
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 18,
        borderWidth: 1.5,
        gap: 14,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    avatarLetter: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    body: {
        flex: 1,
    },
    eyebrow: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.4,
        opacity: 0.7,
        marginBottom: 2,
    },
    name: {
        fontWeight: '700',
        fontSize: 15,
    },
    action: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
