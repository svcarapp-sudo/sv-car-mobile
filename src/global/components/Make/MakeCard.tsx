import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {MakeApi} from '../../services/catalogService'

interface MakeCardProps {
    item: MakeApi
    isSelected: boolean
    onPress: (make: MakeApi) => void
}

export const MakeCard = ({item, isSelected, onPress}: MakeCardProps) => {
    const theme = useAppTheme()
    const logoUrl = item.logoUrl ?? null

    return (
        <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7} style={styles.gridItem}>
            <View
                style={[
                    styles.card,
                    {backgroundColor: theme.colors.surface},
                    isSelected && styles.cardSelected,
                ]}>
                {isSelected && (
                    <View style={styles.selectedBadge}>
                        <View style={styles.selectedBadgeCircle}>
                            <Icon source="check" size={9} color={theme.colors.onPrimary} />
                        </View>
                    </View>
                )}
                <View style={[styles.logoContainer, isSelected && styles.logoContainerSelected]}>
                    {logoUrl ? <Image source={{uri: logoUrl}} style={styles.logo} resizeMode="contain" /> : null}
                </View>
                <Text
                    variant="labelMedium"
                    numberOfLines={1}
                    style={[
                        styles.brandName,
                        {color: theme.colors.onSurface},
                        isSelected && {fontWeight: '700'},
                    ]}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        margin: 5,
    },
    card: {
        borderRadius: 14,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderWidth: 1.5,
        borderColor: 'transparent',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    cardSelected: {
        borderColor: themeColors.tertiary,
        backgroundColor: themeColors.accentSubtle,
        shadowColor: themeColors.tertiary,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedBadge: {
        position: 'absolute',
        top: 6,
        start: 6,
        zIndex: 1,
    },
    selectedBadgeCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: themeColors.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: themeColors.background,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: themeColors.primaryContainer,
    },
    logoContainerSelected: {
        borderColor: themeColors.tertiary,
        backgroundColor: themeColors.accentFaded,
    },
    logo: {
        width: 38,
        height: 38,
    },
    brandName: {
        textAlign: 'center',
    },
})
