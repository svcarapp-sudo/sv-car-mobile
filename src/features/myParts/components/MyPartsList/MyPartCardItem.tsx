import {useState} from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Icon, Menu, Text, TouchableRipple} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {shadows, themeColors} from '@/global/theme'
import type {Part, PartCategoryApi} from '@/global/types'

import {MyPartCardFooter} from './MyPartCardFooter'

const FRESH_WINDOW_MS = 48 * 60 * 60 * 1000

interface MyPartCardItemProps {
    part: Part
    onEdit: (partId: string) => void
    onDelete: (partId: string, partName: string) => void
    categoryInfo?: PartCategoryApi | null
}

const T = {EDIT: 'تعديل', DELETE: 'حذف', FRESH: 'جديد', MORE: (n: number) => `+${n} مركبة`}

const buildVehicleLabel = (v: NonNullable<Part['compatibleVehicles']>[number]) => {
    const range = v.yearFrom === v.yearTo ? `${v.yearFrom ?? ''}` : `${v.yearFrom ?? ''}-${v.yearTo ?? ''}`
    return `${v.make} ${v.model} ${range}`.trim()
}

export const MyPartCardItem = ({part, onEdit, onDelete, categoryInfo}: MyPartCardItemProps) => {
    const theme = useAppTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const vehicles = part.compatibleVehicles ?? []
    const firstVehicle = vehicles[0]
    const isFresh = part.createdAt != null && Date.now() - part.createdAt < FRESH_WINDOW_MS

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <TouchableRipple onPress={() => onEdit(part.id)} borderless rippleColor={theme.colors.scrim} style={styles.ripple}>
                <View style={styles.body}>
                    <View style={styles.mediaBox}>
                        {part.imageUrl ? (
                            <Image source={{uri: part.imageUrl}} style={styles.image} resizeMode='cover' />
                        ) : (
                            <View style={[styles.imagePlaceholder, {backgroundColor: theme.colors.accentSubtle}]}>
                                <Icon source={categoryInfo?.icon || 'package-variant'} size={32} color={theme.colors.tertiary} />
                            </View>
                        )}
                        {isFresh && (
                            <View style={[styles.freshPill, {backgroundColor: theme.colors.tertiary}]}>
                                <Text style={[styles.freshText, {color: theme.colors.onTertiary}]}>{T.FRESH}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.info}>
                        <View style={styles.topRow}>
                            {categoryInfo && (
                                <View style={[styles.categoryChip, {backgroundColor: theme.colors.primaryContainer}]}>
                                    <Icon source={categoryInfo.icon} size={10} color={theme.colors.primary} />
                                    <Text style={[styles.categoryText, {color: theme.colors.primary}]} numberOfLines={1}>
                                        {categoryInfo.name}
                                    </Text>
                                </View>
                            )}
                            <Menu
                                visible={menuOpen}
                                onDismiss={() => setMenuOpen(false)}
                                contentStyle={{backgroundColor: theme.colors.surface}}
                                anchor={
                                    <Pressable onPress={() => setMenuOpen(true)} hitSlop={10} style={styles.kebab}>
                                        <Icon source='dots-horizontal' size={18} color={theme.colors.onSurfaceVariant} />
                                    </Pressable>
                                }>
                                <Menu.Item
                                    onPress={() => {
                                        setMenuOpen(false)
                                        onEdit(part.id)
                                    }}
                                    title={T.EDIT}
                                    leadingIcon='pencil-outline'
                                />
                                <Menu.Item
                                    onPress={() => {
                                        setMenuOpen(false)
                                        onDelete(part.id, part.name)
                                    }}
                                    title={T.DELETE}
                                    leadingIcon='delete-outline'
                                    titleStyle={{color: theme.colors.error}}
                                />
                            </Menu>
                        </View>
                        <Text style={[styles.name, {color: theme.colors.onSurface}]} numberOfLines={2}>
                            {part.name}
                        </Text>
                        {firstVehicle && (
                            <View style={styles.vehicleRow}>
                                <Icon source='shield-check' size={12} color={theme.colors.success} />
                                <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                                    {buildVehicleLabel(firstVehicle)}
                                </Text>
                                {vehicles.length > 1 && (
                                    <Text style={[styles.morePill, {color: theme.colors.tertiary}]}>
                                        {T.MORE(vehicles.length - 1)}
                                    </Text>
                                )}
                            </View>
                        )}
                        <MyPartCardFooter price={part.price} viewCount={part.viewCount ?? 0} sku={part.sku} />
                    </View>
                </View>
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {borderRadius: 16, marginBottom: 10, overflow: 'hidden', ...shadows.sm, shadowColor: themeColors.shadow},
    ripple: {borderRadius: 16},
    body: {flexDirection: 'row', alignItems: 'stretch', padding: 12, gap: 12},
    mediaBox: {width: 96, height: 96, borderRadius: 14, overflow: 'hidden', position: 'relative'},
    image: {width: '100%', height: '100%'},
    imagePlaceholder: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
    freshPill: {position: 'absolute', top: 6, end: 6, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999},
    freshText: {fontSize: 9, fontWeight: '800', letterSpacing: 0.3},
    info: {flex: 1, gap: 4, justifyContent: 'space-between'},
    topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6},
    categoryChip: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999},
    categoryText: {fontSize: 10, fontWeight: '700', letterSpacing: 0.2, marginStart: 4},
    kebab: {padding: 2, marginStart: 'auto'},
    name: {fontSize: 14, fontWeight: '700', lineHeight: 19},
    vehicleRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
    vehicleText: {fontSize: 11, fontWeight: '500', flex: 1},
    morePill: {fontSize: 10, fontWeight: '700'},
})
