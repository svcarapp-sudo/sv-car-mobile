import React, {useState} from 'react'
import {StyleSheet, View, type LayoutChangeEvent} from 'react-native'
import {Avatar, Icon, Text} from 'react-native-paper'

import {themeColors} from '@/global/theme'
import type {SellerSummary} from '../../types'
import {SellerHeroBackdrop} from './SellerHeroBackdrop'
import {VerifiedBadge} from './VerifiedBadge'

const ARABIC = {EYEBROW: 'حساب البائع', MEMBER_SINCE: 'عضو منذ', TYPE_FALLBACK: 'بائع'}

const INITIAL_HEIGHT = 220

const initialsOf = (name: string | null) => name?.trim()?.slice(0, 2).toUpperCase() || 'SV'

const memberSinceYear = (iso: string | null) => {
    if (!iso) return null
    const year = new Date(iso).getFullYear()
    if (Number.isNaN(year)) return null
    return new Intl.NumberFormat('ar-SA', {useGrouping: false}).format(year)
}

interface SellerHeroProps {
    summary: SellerSummary
}

export const SellerHero = ({summary}: SellerHeroProps) => {
    const [height, setHeight] = useState(INITIAL_HEIGHT)
    const onLayout = (e: LayoutChangeEvent) => {
        const next = e.nativeEvent.layout.height
        if (Math.abs(next - height) > 0.5) setHeight(next)
    }

    const name = summary.storeName || summary.userName || ARABIC.TYPE_FALLBACK
    const year = memberSinceYear(summary.memberSince)
    const meta = [year ? `${ARABIC.MEMBER_SINCE} ${year}` : null, summary.city].filter(Boolean).join('  •  ')

    return (
        <View style={styles.wrapper} onLayout={onLayout}>
            <SellerHeroBackdrop height={height} />

            <View style={styles.content}>
                <View style={styles.eyebrowRow}>
                    <View style={styles.dot} />
                    <Text style={styles.eyebrow}>{ARABIC.EYEBROW}</Text>
                </View>

                <View style={styles.identity}>
                    {summary.profileImageUrl ? (
                        <Avatar.Image size={64} source={{uri: summary.profileImageUrl}} style={styles.avatar} />
                    ) : (
                        <Avatar.Text size={64} label={initialsOf(name)} style={styles.avatar} labelStyle={styles.avatarLabel} />
                    )}

                    <View style={styles.identityText}>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>
                        {!!summary.sellerTypeName && (
                            <View style={styles.typeRow}>
                                <Icon source='storefront-outline' size={13} color={themeColors.onDarkMedium} />
                                <Text style={styles.type} numberOfLines={1}>
                                    {summary.sellerTypeName}
                                </Text>
                            </View>
                        )}
                        {summary.verified && <VerifiedBadge />}
                    </View>
                </View>

                {!!meta && (
                    <Text style={styles.meta} numberOfLines={1}>
                        {meta}
                    </Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {position: 'relative', borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden'},
    content: {paddingHorizontal: 20, paddingTop: 16, paddingBottom: 26, position: 'relative', zIndex: 1},
    eyebrowRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16},
    dot: {width: 6, height: 6, borderRadius: 3, backgroundColor: themeColors.tertiary},
    eyebrow: {fontSize: 12, fontWeight: '700', letterSpacing: 1.6, color: themeColors.onDarkMedium, textTransform: 'uppercase'},
    identity: {flexDirection: 'row', alignItems: 'center', gap: 14},
    avatar: {backgroundColor: themeColors.onDarkContainer, borderWidth: 1, borderColor: themeColors.onDarkBorder},
    avatarLabel: {fontSize: 22, fontWeight: '700', color: themeColors.onDarkHigh},
    identityText: {flex: 1, gap: 6},
    name: {fontSize: 22, fontWeight: '800', color: themeColors.onDarkHigh, letterSpacing: -0.3},
    typeRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    type: {fontSize: 13, fontWeight: '600', color: themeColors.onDarkMedium, flexShrink: 1},
    meta: {marginTop: 16, fontSize: 12.5, fontWeight: '600', color: themeColors.onDarkLow},
})
