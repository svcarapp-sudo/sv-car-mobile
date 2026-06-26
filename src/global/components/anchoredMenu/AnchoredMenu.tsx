import {useRef, useState} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {Animated, Modal, Pressable, StyleSheet, View, useWindowDimensions} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows} from '@/global/theme'
import {haptics} from '@/global/utils'

export interface AnchoredMenuItem {
    key: string
    label: string
    icon: string
    onPress: () => void
    destructive?: boolean
}

interface AnchoredMenuProps {
    items: AnchoredMenuItem[]
    anchorIcon?: string
    anchorIconSize?: number
    accessibilityLabel?: string
    anchorStyle?: StyleProp<ViewStyle>
}

const DISMISS = 'إغلاق'
const MENU_WIDTH = 212
const SCREEN_PAD = 12
const GAP = 6
const EST_ITEM_H = 48

/**
 * Anchored action menu (kebab → popover). Built on a transparent RN Modal
 * instead of react-native-paper's <Menu>, whose animation `finished` callback
 * returns false under the New Architecture (Expo 54 / RN 0.81) — leaving the
 * menu stuck after the first open (callstack/react-native-paper#4807). The
 * anchor is measured on press so the card drops beside it, flipping above when
 * near the bottom edge; positioning uses absolute screen coords so it is
 * correct in both LTR and RTL.
 */
export const AnchoredMenu = ({
    items,
    anchorIcon = 'dots-horizontal',
    anchorIconSize = 20,
    accessibilityLabel = 'الإجراءات',
    anchorStyle,
}: AnchoredMenuProps) => {
    const theme = useAppTheme()
    const {width: winW, height: winH} = useWindowDimensions()
    const anchorRef = useRef<View>(null)
    const [open, setOpen] = useState(false)
    const [box, setBox] = useState({top: 0, left: 0})
    const anim = useRef(new Animated.Value(0)).current

    const openMenu = () => {
        anchorRef.current?.measureInWindow((x, y, w, h) => {
            const left = Math.min(Math.max(SCREEN_PAD, x + w - MENU_WIDTH), winW - MENU_WIDTH - SCREEN_PAD)
            const estH = items.length * EST_ITEM_H + 8
            const below = y + h + GAP
            const flipAbove = below + estH > winH - SCREEN_PAD && y - estH - GAP > SCREEN_PAD
            setBox({top: flipAbove ? y - estH - GAP : below, left})
            anim.setValue(0)
            setOpen(true)
            haptics.selection()
            Animated.spring(anim, {toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6}).start()
        })
    }

    const close = () => setOpen(false)
    const select = (fn: () => void) => () => {
        close()
        fn()
    }

    return (
        <>
            <Pressable
                ref={anchorRef}
                onPress={openMenu}
                hitSlop={12}
                style={[styles.anchor, anchorStyle]}
                accessibilityRole='button'
                accessibilityLabel={accessibilityLabel}>
                <Icon source={anchorIcon} size={anchorIconSize} color={theme.colors.onSurfaceVariant} />
            </Pressable>
            <Modal visible={open} transparent animationType='none' onRequestClose={close} statusBarTranslucent>
                <View style={styles.root}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel={DISMISS} />
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                top: box.top,
                                left: box.left,
                                backgroundColor: theme.colors.surface,
                                opacity: anim,
                                transform: [{scale: anim.interpolate({inputRange: [0, 1], outputRange: [0.93, 1]})}],
                            },
                        ]}>
                        {items.map((item, i) => (
                            <Pressable
                                key={item.key}
                                onPress={select(item.onPress)}
                                android_ripple={{color: theme.colors.surfaceVariant}}
                                style={({pressed}) => [
                                    styles.item,
                                    i > 0 && {
                                        borderTopWidth: StyleSheet.hairlineWidth,
                                        borderTopColor: theme.colors.outlineVariant,
                                    },
                                    pressed && {backgroundColor: theme.colors.surfaceVariant},
                                ]}>
                                <Icon
                                    source={item.icon}
                                    size={18}
                                    color={item.destructive ? theme.colors.error : theme.colors.onSurfaceVariant}
                                />
                                <Text
                                    style={[
                                        styles.label,
                                        {color: item.destructive ? theme.colors.error : theme.colors.onSurface},
                                    ]}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        ))}
                    </Animated.View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    anchor: {padding: 6},
    root: {flex: 1},
    card: {position: 'absolute', width: MENU_WIDTH, borderRadius: 14, paddingVertical: 4, overflow: 'hidden', ...shadows.lg},
    item: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 13},
    label: {fontSize: 14, fontWeight: '600', flexShrink: 1},
})
