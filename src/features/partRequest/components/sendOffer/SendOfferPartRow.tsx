import {StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {FadeInImage, PressableScale, PriceTag} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import type {Part} from '@/global/types'

interface SendOfferPartRowProps {
    part: Part
    selected: boolean
    onPress: () => void
}

/** Selectable row for one of the seller's listings inside the link picker. */
export const SendOfferPartRow = ({part, selected, onPress}: SendOfferPartRowProps) => {
    const theme = useAppTheme()

    return (
        <PressableScale
            onPress={onPress}
            style={[
                styles.row,
                {backgroundColor: theme.colors.surfaceContainerLow, borderColor: theme.colors.outline},
                selected && {borderColor: theme.colors.tertiary, backgroundColor: theme.colors.accentSoft},
            ]}
            accessibilityRole='button'
            accessibilityState={{selected}}>
            <View style={styles.thumb}>
                {part.imageUrl ? (
                    <FadeInImage source={{uri: part.imageUrl}} style={styles.thumbImg} />
                ) : (
                    <View style={[styles.thumbArt, {backgroundColor: theme.colors.surfaceContainerHigh}]}>
                        <Icon source='cog-outline' size={22} color={theme.colors.onSurfaceVariant} />
                    </View>
                )}
            </View>
            <View style={styles.info}>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={1}>
                    {part.name}
                </Text>
                <PriceTag price={part.price} size='sm' />
            </View>
            <Icon
                source={selected ? 'check-circle' : 'circle-outline'}
                size={22}
                color={selected ? theme.colors.tertiary : theme.colors.outline}
            />
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, borderRadius: 14, borderWidth: 1.5},
    thumb: {width: 46, height: 46, borderRadius: 10, overflow: 'hidden'},
    thumbImg: {width: '100%', height: '100%'},
    thumbArt: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
    info: {flex: 1, gap: 3},
    name: {fontSize: 13, fontWeight: '700'},
})
