import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {OriginApi} from '@/global/services'
import {themeColors} from '@/global/theme'

interface OriginCardProps {
    item: OriginApi
    isSelected: boolean
    onPress: (origin: OriginApi) => void
}

export const OriginCard = ({item, isSelected, onPress}: OriginCardProps) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.7}
            style={[styles.originCard, {backgroundColor: theme.colors.surface}, isSelected && styles.originCardSelected]}>
            {isSelected && <View style={styles.selectedAccent} />}
            <View style={styles.originContent}>
                <View
                    style={[
                        styles.originIcon,
                        {
                            backgroundColor: isSelected ? theme.colors.accentSoft : theme.colors.surfaceVariant,
                        },
                    ]}>
                    <Icon source='earth' size={20} color={isSelected ? theme.colors.tertiary : theme.colors.onSurfaceVariant} />
                </View>
                <Text
                    variant='titleMedium'
                    style={[styles.originName, {color: theme.colors.onSurface}, isSelected && {fontWeight: '700'}]}>
                    {item.name}
                </Text>
            </View>
            {isSelected && (
                <View style={styles.checkWrap}>
                    <Icon source='check-circle' size={22} color={theme.colors.tertiary} />
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    originCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    originCardSelected: {
        borderColor: themeColors.tertiary,
        backgroundColor: themeColors.accentSubtle,
        shadowColor: themeColors.tertiary,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedAccent: {
        position: 'absolute',
        start: 0,
        top: 10,
        bottom: 10,
        width: 4,
        borderRadius: 2,
        backgroundColor: themeColors.tertiary,
    },
    originContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    originIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    originName: {
        flex: 1,
        fontWeight: '500',
    },
    checkWrap: {
        marginStart: 8,
    },
})
