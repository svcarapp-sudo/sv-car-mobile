import React, {useMemo} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Icon, Text} from 'react-native-paper'

import {PressableScale} from '@/global/components'
import {useCatalog} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {Part, Vehicle} from '@/global/types'
import {useRecommendedParts} from '../../hooks'
import {RecommendedPartCard} from './RecommendedPartCard'
import {RecommendedRailSkeleton} from './RecommendedRailSkeleton'

interface RecommendedRailProps {
    vehicle: Partial<Vehicle>
    onSelectPart: (partId: string) => void
    onViewAll: () => void
}

const ARABIC_TEXT = {
    TITLE: 'موصى لمركبتك',
    SUBTITLE_PREFIX: 'قطع متوافقة مع',
    VIEW_ALL: 'عرض الكل',
    EMPTY: 'لا توجد قطع موصى بها حالياً',
    RETRY: 'إعادة المحاولة',
}

export const RecommendedRail = ({vehicle, onSelectPart, onViewAll}: RecommendedRailProps) => {
    const {parts, loading, error, refresh} = useRecommendedParts(8)
    const {categories} = useCatalog()

    const iconFor = useMemo(() => {
        const map = new Map<number, string>()
        for (const c of categories) map.set(c.id, c.icon)
        return (p: Part) => (p.categoryId ? map.get(p.categoryId) : undefined)
    }, [categories])

    const subtitle = `${ARABIC_TEXT.SUBTITLE_PREFIX} ${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim()

    if (parts.length === 0) {
        let body = (
            <View style={styles.state}>
                <Text style={styles.emptyText}>{ARABIC_TEXT.EMPTY}</Text>
            </View>
        )
        if (loading) {
            body = <RecommendedRailSkeleton />
        } else if (error) {
            body = (
                <View style={styles.state}>
                    <PressableScale onPress={refresh} style={styles.retry} accessibilityRole='button'>
                        <Icon source='refresh' size={16} color={themeColors.primary} />
                        <Text style={styles.retryText}>{ARABIC_TEXT.RETRY}</Text>
                    </PressableScale>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Header subtitle={subtitle} onViewAll={onViewAll} showViewAll={false} />
                {body}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header subtitle={subtitle} onViewAll={onViewAll} showViewAll />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {parts.map(part => (
                    <RecommendedPartCard key={part.id} part={part} icon={iconFor(part)} onPress={() => onSelectPart(part.id)} />
                ))}
            </ScrollView>
        </View>
    )
}

const Header = ({subtitle, onViewAll, showViewAll}: {subtitle: string; onViewAll: () => void; showViewAll: boolean}) => (
    <View style={styles.header}>
        <View style={styles.titleBlock}>
            <View style={styles.titleRow}>
                <View style={styles.titleAccent} />
                <Text style={styles.title}>{ARABIC_TEXT.TITLE}</Text>
            </View>
            <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
            </Text>
        </View>
        {showViewAll && (
            <Text style={styles.viewAll} onPress={onViewAll}>
                {ARABIC_TEXT.VIEW_ALL}
            </Text>
        )}
    </View>
)

const styles = StyleSheet.create({
    container: {marginBottom: 24},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 18,
        marginBottom: 12,
    },
    titleBlock: {flex: 1, marginEnd: 12},
    titleRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    titleAccent: {width: 3, height: 16, borderRadius: 2, backgroundColor: themeColors.tertiary},
    title: {fontSize: 17, fontWeight: '700', color: themeColors.onSurface, letterSpacing: -0.2},
    subtitle: {fontSize: 12, fontWeight: '500', color: themeColors.onSurfaceVariant, marginTop: 4, marginStart: 11},
    viewAll: {fontSize: 12.5, fontWeight: '700', color: themeColors.primary, paddingHorizontal: 6},
    scrollContent: {paddingHorizontal: 18, paddingEnd: 6},
    state: {paddingHorizontal: 18, paddingVertical: 24, alignItems: 'center'},
    emptyText: {color: themeColors.onSurfaceVariant, fontSize: 12.5},
    retry: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: themeColors.outlineVariant,
        backgroundColor: themeColors.surface,
    },
    retryText: {fontSize: 12.5, fontWeight: '700', color: themeColors.primary},
})
