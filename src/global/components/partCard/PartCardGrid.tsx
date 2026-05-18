import {Image, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {useSavedPartsStore} from '@/global/store'
import {shadows} from '@/global/theme'
import type {Part, PartCategoryApi} from '@/global/types'

import {PriceTag} from './PriceTag'
import {SaveButton} from './SaveButton'

interface PartCardGridProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
}

export const PartCardGrid = ({part, categoryInfo}: PartCardGridProps) => {
    const theme = useAppTheme()
    const saved = useSavedPartsStore(s => s.ids.includes(part.id))
    const toggle = useSavedPartsStore(s => s.toggle)

    return (
        <View
            style={[styles.card, shadows.sm, {backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant}]}>
            <View style={[styles.mediaBox, {backgroundColor: theme.colors.surfaceContainerLow}]}>
                {part.imageUrl ? (
                    <Image source={{uri: part.imageUrl}} style={styles.media} resizeMode='cover' />
                ) : (
                    <View style={[styles.placeholder, {backgroundColor: theme.colors.accentSubtle}]}>
                        <Icon source={categoryInfo?.icon || 'package-variant'} size={42} color={theme.colors.tertiary} />
                    </View>
                )}

                <View style={styles.saveFloat}>
                    <SaveButton
                        saved={saved}
                        onPress={() => {
                            void toggle(part.id).catch(() => undefined)
                        }}
                        size='sm'
                        floating
                    />
                </View>

                {!part.inStock && (
                    <View style={[styles.soldOverlay, {backgroundColor: theme.colors.backdrop}]}>
                        <View style={[styles.soldPill, {backgroundColor: theme.colors.errorContainer}]}>
                            <Text style={[styles.soldText, {color: theme.colors.errorDark}]}>غير متوفر</Text>
                        </View>
                    </View>
                )}
            </View>

            <View style={styles.body}>
                <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>
                    {part.name}
                </Text>

                <View style={styles.bottom}>
                    <PriceTag price={part.price} size='md' />
                    {part.sellerCity && (
                        <View style={styles.city}>
                            <Icon source='map-marker-outline' size={11} color={theme.colors.onSurfaceVariant} />
                            <Text style={[styles.cityText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                {part.sellerCity}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        borderWidth: 1,
        overflow: 'hidden',
    },
    mediaBox: {aspectRatio: 1, position: 'relative'},
    media: {width: '100%', height: '100%'},
    placeholder: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    saveFloat: {position: 'absolute', top: 8, end: 8},
    soldOverlay: {...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center'},
    soldPill: {paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999},
    soldText: {fontSize: 12, fontWeight: '700', letterSpacing: 0.3},
    body: {padding: 12, gap: 7},
    name: {fontSize: 13, fontWeight: '700', lineHeight: 18, letterSpacing: -0.1, minHeight: 36},
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginTop: 2,
    },
    city: {flexDirection: 'row', alignItems: 'center', gap: 3, flexShrink: 1},
    cityText: {fontSize: 10.5, fontWeight: '500', flexShrink: 1},
})
