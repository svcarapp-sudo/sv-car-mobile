import {Image, StyleSheet, View} from 'react-native'
import {Icon} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'

interface PartCardImageProps {
    imageUrl?: string
    categoryIcon?: string
}

export const PartCardImage = ({imageUrl, categoryIcon}: PartCardImageProps) => {
    const theme = useAppTheme()

    if (imageUrl) {
        return <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
    }

    return (
        <View style={[styles.placeholder, {backgroundColor: theme.colors.primaryContainer}]}>
            <Icon source={categoryIcon || 'package-variant'} size={28} color={theme.colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: themeColors.surfaceVariant,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
