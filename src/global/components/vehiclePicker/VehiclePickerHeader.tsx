import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'

const CLOSE = 'إغلاق'

interface VehiclePickerHeaderProps {
    title: string
    subtitle: string
    count: number
    max?: number
    onClose: () => void
}

/** Light sheet header; also hosts the drag handle. */
export const VehiclePickerHeader = ({title, subtitle, count, max, onClose}: VehiclePickerHeaderProps) => (
    <View style={styles.band}>
        <View style={styles.handle} />
        <View style={styles.row}>
            <View style={styles.titleBlock}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {subtitle}
                </Text>
            </View>

            {max != null && (
                <View style={styles.counterChip}>
                    <Text style={styles.counterText}>
                        {count}/{max}
                    </Text>
                </View>
            )}

            <Pressable
                onPress={onClose}
                hitSlop={10}
                style={({pressed}) => [styles.closeBtn, pressed && styles.pressed]}
                accessibilityRole='button'
                accessibilityLabel={CLOSE}>
                <Icon source='close' size={20} color={themeColors.onSurfaceVariant} />
            </Pressable>
        </View>
    </View>
)

const styles = StyleSheet.create({
    band: {
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        paddingTop: 10,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: themeColors.outlineVariant,
    },
    handle: {alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: themeColors.outline, marginBottom: 14},
    row: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 10},
    titleBlock: {flex: 1},
    title: {fontSize: 19, fontWeight: '800', color: themeColors.onSurface, letterSpacing: -0.3},
    subtitle: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 3},
    counterChip: {paddingHorizontal: 11, paddingVertical: 5, borderRadius: 999, backgroundColor: themeColors.accentSubtle},
    counterText: {fontSize: 12, fontWeight: '800', color: themeColors.tertiary, letterSpacing: 0.3},
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: themeColors.surfaceContainerLow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {opacity: 0.6},
})
