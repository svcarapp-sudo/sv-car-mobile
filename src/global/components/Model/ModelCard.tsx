import {StyleSheet, View, I18nManager} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {ModelApi} from '../../services/catalogService'
import {PressableScale} from '../motion'

interface ModelCardProps {
    item: ModelApi
    isSelected: boolean
    onPress: (model: ModelApi) => void
}

export const ModelCard = ({item, isSelected, onPress}: ModelCardProps) => {
    const theme = useAppTheme()
    const iconSource = isSelected ? 'check-circle' : 'car-side'
    const needsFlip = !isSelected && I18nManager.isRTL

    return (
        <PressableScale
            onPress={() => onPress(item)}
            withHaptic
            containerStyle={styles.cardContainer}
            style={[styles.modelCard, {backgroundColor: theme.colors.surface}, isSelected && styles.modelCardSelected]}>
            {isSelected && <View style={styles.selectedAccent} />}
            <View style={styles.modelContent}>
                <View
                    style={[
                        styles.modelIcon,
                        {backgroundColor: isSelected ? theme.colors.accentSoft : theme.colors.surfaceVariant},
                    ]}>
                    <View style={needsFlip ? styles.flippedIcon : undefined}>
                        <Icon
                            source={iconSource}
                            size={18}
                            color={isSelected ? theme.colors.tertiary : theme.colors.onSurfaceVariant}
                        />
                    </View>
                </View>
                <Text
                    variant='titleMedium'
                    style={[styles.modelName, {color: theme.colors.onSurface}, isSelected && {fontWeight: '700'}]}>
                    {item.name}
                </Text>
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 8,
    },
    modelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    modelCardSelected: {
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
    modelContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    modelIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    modelName: {
        flex: 1,
        fontWeight: '500',
    },
    flippedIcon: {
        transform: [{scaleX: -1}],
    },
})
