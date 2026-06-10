import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {PriceTag} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import {haptics} from '@/global/utils'

const ARABIC_TEXT = {
    PRICE_CAPTION: 'السعر الإجمالي',
    SAVE: 'حفظ في المفضلة',
    UNSAVE: 'إزالة من المفضلة',
}

interface PartDetailActionsProps {
    price: number
    isSaved: boolean
    onSave: () => void
}

/**
 * Sticky bottom action bar. RTL: price anchors the leading edge, save sits at
 * the trailing edge. The old "contact seller" CTA was a dead tap — no seller
 * phone exists in the part data — so it was removed until a real contact
 * channel is available.
 */
export const PartDetailActions = ({price, isSaved, onSave}: PartDetailActionsProps) => {
    const theme = useAppTheme()
    const insets = useSafeAreaInsets()
    const bottomPad = Math.max(insets.bottom, 12)

    const handleSave = () => {
        haptics.light()
        onSave()
    }

    return (
        <View
            style={[
                styles.bar,
                shadows.lg,
                {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outlineVariant,
                    paddingBottom: bottomPad,
                },
            ]}>
            <View style={styles.priceBlock}>
                <Text style={[styles.priceCaption, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.PRICE_CAPTION}</Text>
                <PriceTag price={price} size='lg' />
            </View>

            <TouchableOpacity
                onPress={handleSave}
                style={[
                    styles.saveBtn,
                    {
                        borderColor: isSaved ? theme.colors.error : theme.colors.outline,
                        backgroundColor: theme.colors.surface,
                    },
                ]}
                activeOpacity={0.7}
                accessibilityRole='button'
                accessibilityLabel={isSaved ? ARABIC_TEXT.UNSAVE : ARABIC_TEXT.SAVE}>
                <Icon
                    source={isSaved ? 'heart' : 'heart-outline'}
                    size={22}
                    color={isSaved ? theme.colors.error : theme.colors.onSurface}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    priceBlock: {flex: 1, gap: 2},
    priceCaption: {fontSize: 10.5, fontWeight: '600', letterSpacing: 0.2},
    saveBtn: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.2,
    },
})
