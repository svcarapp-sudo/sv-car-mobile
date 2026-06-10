import {I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {SaveButton, showToast} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useSavedPartsStore} from '@/global/store'
import {shadows} from '@/global/theme'

const ARABIC_TEXT = {
    BACK: 'رجوع',
    SHARE: 'مشاركة',
    SAVE_ERROR: 'تعذر تحديث المفضلة',
}

interface PartDetailHeroNavProps {
    partId: string
    onBack: () => void
    onShare?: () => void
}

/** Floating circular nav controls over the hero image (Airbnb pattern). */
export const PartDetailHeroNav = ({partId, onBack, onShare}: PartDetailHeroNavProps) => {
    const theme = useAppTheme()
    const saved = useSavedPartsStore(s => s.ids.includes(partId))
    const toggle = useSavedPartsStore(s => s.toggle)
    const backIcon = I18nManager.isRTL ? 'arrow-left' : 'arrow-right'

    return (
        <View style={styles.navRow}>
            <TouchableOpacity
                onPress={onBack}
                activeOpacity={0.7}
                style={[styles.circleBtn, shadows.sm, {backgroundColor: theme.colors.surface}]}
                accessibilityRole='button'
                accessibilityLabel={ARABIC_TEXT.BACK}>
                <Icon source={backIcon} size={22} color={theme.colors.onSurface} />
            </TouchableOpacity>

            <View style={styles.navEnd}>
                {onShare && (
                    <TouchableOpacity
                        onPress={onShare}
                        activeOpacity={0.7}
                        style={[styles.circleBtn, shadows.sm, {backgroundColor: theme.colors.surface}]}
                        accessibilityRole='button'
                        accessibilityLabel={ARABIC_TEXT.SHARE}>
                        <Icon source='share-variant' size={20} color={theme.colors.onSurface} />
                    </TouchableOpacity>
                )}
                <SaveButton
                    saved={saved}
                    onPress={() => {
                        void toggle(partId).catch(() => showToast(ARABIC_TEXT.SAVE_ERROR, 'error'))
                    }}
                    floating
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navRow: {
        position: 'absolute',
        top: 12,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navEnd: {flexDirection: 'row', alignItems: 'center', gap: 10},
    circleBtn: {
        width: 42,
        height: 42,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
