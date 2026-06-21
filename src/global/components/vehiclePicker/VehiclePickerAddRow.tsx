import {Pressable, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {shadows, themeColors} from '@/global/theme'

const T = {
    ADD: 'إضافة مركبة جديدة',
    CAP_HEADLINE: 'وصلت إلى الحد الأقصى',
    CAP_HINT: 'احذف مركبة لإضافة أخرى',
}

interface VehiclePickerAddRowProps {
    capReached: boolean
    onPress: () => void
}

/** Solid filled CTA — intentionally distinct from a vehicle row. */
export const VehiclePickerAddRow = ({capReached, onPress}: VehiclePickerAddRowProps) => {
    if (capReached) {
        return (
            <View style={styles.capRow}>
                <Icon source='information-outline' size={18} color={themeColors.onSurfaceVariant} />
                <View style={styles.capText}>
                    <Text style={styles.capHeadline}>{T.CAP_HEADLINE}</Text>
                    <Text style={styles.capHint}>{T.CAP_HINT}</Text>
                </View>
            </View>
        )
    }

    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.addBtn, pressed && styles.pressed]}
            accessibilityRole='button'
            accessibilityLabel={T.ADD}>
            <Icon source='plus' size={20} color={themeColors.onPrimary} />
            <Text style={styles.addText}>{T.ADD}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: themeColors.primary,
        borderRadius: 16,
        paddingVertical: 15,
        marginTop: 6,
        ...shadows.sm,
        shadowColor: themeColors.primary,
    },
    pressed: {opacity: 0.9, transform: [{scale: 0.99}]},
    addText: {fontSize: 15, fontWeight: '800', color: themeColors.onPrimary, letterSpacing: -0.1},
    capRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: themeColors.surfaceContainerLow,
        marginTop: 6,
    },
    capText: {flex: 1},
    capHeadline: {fontSize: 13.5, fontWeight: '700', color: themeColors.onSurface},
    capHint: {fontSize: 11.5, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 2},
})
