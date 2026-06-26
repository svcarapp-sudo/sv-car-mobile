import {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {apiClient, getCategoriesForMapping} from '@/global/services'
import {shadows, themeColors} from '@/global/theme'
import type {Part} from '@/global/types'
import {haptics, mapPartModelToPart} from '@/global/utils'
import type {PartModelResponse} from '@/global/utils'

import {SendOfferPartRow} from './SendOfferPartRow'

const T = {
    HEADING: 'اربط قطعة من إعلاناتي',
    HINT: 'اختياري — أرفق إعلانك ليراه المشتري',
    EMPTY: 'لا توجد إعلانات لربطها',
    CLEAR: 'إلغاء الربط',
}

interface SendOfferPartPickerProps {
    selectedPartId?: number
    onSelect: (partId: number | undefined) => void
}

/** Collapsible optional picker linking one of the seller's own listings to the offer. */
export const SendOfferPartPicker = ({selectedPartId, onSelect}: SendOfferPartPickerProps) => {
    const theme = useAppTheme()
    const [open, setOpen] = useState(false)
    const [parts, setParts] = useState<Part[]>([])
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const [models, categories] = await Promise.all([
                apiClient.get<PartModelResponse[]>('/api/parts/my-parts'),
                getCategoriesForMapping().catch(() => []),
            ])
            setParts(models.map(m => mapPartModelToPart(m, categories)))
        } catch {
            setParts([])
        } finally {
            setLoading(false)
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        if (open && !loaded) load().catch(() => {})
    }, [open, loaded, load])

    const toggle = () => {
        haptics.selection()
        setOpen(prev => !prev)
    }

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <PressableScale onPress={toggle} style={styles.header} accessibilityRole='button'>
                <View style={[styles.iconWrap, {backgroundColor: theme.colors.accentSoft}]}>
                    <Icon source='link-variant' size={18} color={theme.colors.tertiary} />
                </View>
                <View style={styles.headerText}>
                    <Text style={[styles.heading, {color: theme.colors.onSurface}]}>{T.HEADING}</Text>
                    <Text style={[styles.hint, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
                        {T.HINT}
                    </Text>
                </View>
                <Icon source={open ? 'chevron-up' : 'chevron-down'} size={22} color={theme.colors.onSurfaceVariant} />
            </PressableScale>

            {open && (
                <View style={styles.body}>
                    {loading ? (
                        <ActivityIndicator size='small' color={theme.colors.tertiary} style={styles.loader} />
                    ) : parts.length === 0 ? (
                        <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{T.EMPTY}</Text>
                    ) : (
                        <>
                            {parts.map(part => (
                                <SendOfferPartRow
                                    key={part.id}
                                    part={part}
                                    selected={Number(part.id) === selectedPartId}
                                    onPress={() => onSelect(Number(part.id) === selectedPartId ? undefined : Number(part.id))}
                                />
                            ))}
                            {selectedPartId != null && (
                                <PressableScale onPress={() => onSelect(undefined)} style={styles.clear}>
                                    <Icon source='close-circle-outline' size={15} color={theme.colors.error} />
                                    <Text style={[styles.clearText, {color: theme.colors.error}]}>{T.CLEAR}</Text>
                                </PressableScale>
                            )}
                        </>
                    )}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {marginHorizontal: 16, marginTop: 14, borderRadius: 18, ...shadows.sm, shadowColor: themeColors.shadow},
    header: {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14},
    iconWrap: {width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center'},
    headerText: {flex: 1, gap: 2},
    heading: {fontSize: 14, fontWeight: '800', letterSpacing: -0.2},
    hint: {fontSize: 11, fontWeight: '500'},
    body: {paddingHorizontal: 12, paddingBottom: 12, gap: 8},
    loader: {paddingVertical: 16},
    empty: {fontSize: 12.5, fontWeight: '600', textAlign: 'center', paddingVertical: 16},
    clear: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8},
    clearText: {fontSize: 12.5, fontWeight: '700'},
})
