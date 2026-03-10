import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    ADD_TO_CART: 'أضف إلى السلة',
    SAVE_TO_FAVORITES: 'إضافة إلى المفضلة',
}

interface PartDetailActionsProps {
    inStock: boolean
}

export const PartDetailActions = ({inStock}: PartDetailActionsProps) => {
    const theme = useAppTheme()

    return (
        <View style={styles.actions}>
            <Button
                mode='contained'
                icon='cart-outline'
                onPress={() => {}}
                disabled={!inStock}
                style={styles.primaryAction}
                contentStyle={styles.actionContent}
                labelStyle={styles.actionLabel}
                buttonColor={theme.colors.tertiary}
                textColor={theme.colors.onTertiary}>
                {ARABIC_TEXT.ADD_TO_CART}
            </Button>
            <Button
                mode='outlined'
                icon='heart-outline'
                onPress={() => {}}
                style={[styles.secondaryAction, {borderColor: theme.colors.outline}]}
                contentStyle={styles.actionContent}
                labelStyle={[styles.actionLabel, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.SAVE_TO_FAVORITES}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    actions: {
        gap: 10,
        marginTop: 8,
    },
    primaryAction: {
        borderRadius: 16,
    },
    secondaryAction: {
        borderRadius: 16,
        borderWidth: 1.5,
    },
    actionContent: {
        paddingVertical: 10,
    },
    actionLabel: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
})
