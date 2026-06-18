import {StyleSheet, View} from 'react-native'
import {Avatar, Chip, Icon, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {SellerSpecialization} from '@/global/types'

const ARABIC = {LABEL: 'ماركات التخصص'}

interface SellerSpecializationsRowProps {
    specializations: SellerSpecialization[]
}

/** Read-only labeled chips showing the makes a seller specializes in. */
export const SellerSpecializationsRow = ({specializations}: SellerSpecializationsRowProps) => {
    const theme = useAppTheme()
    if (specializations.length === 0) return null

    return (
        <View style={styles.wrap}>
            <View style={styles.labelRow}>
                <Icon source='car-multiple' size={16} color={theme.colors.onSurfaceVariant} />
                <Text variant='labelSmall' style={{color: theme.colors.onSurfaceVariant}}>
                    {ARABIC.LABEL}
                </Text>
            </View>
            <View style={styles.chips}>
                {specializations.map(s => (
                    <Chip
                        key={s.id}
                        compact
                        style={[styles.chip, {backgroundColor: theme.colors.accentSubtle}]}
                        textStyle={[styles.chipText, {color: theme.colors.tertiary}]}
                        avatar={
                            s.logoUrl ? <Avatar.Image size={18} source={{uri: s.logoUrl}} style={styles.avatar} /> : undefined
                        }>
                        {s.name}
                    </Chip>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {padding: 16, gap: 10},
    labelRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
    chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
    chip: {borderRadius: 999},
    chipText: {fontSize: 12, fontWeight: '700'},
    avatar: {backgroundColor: 'transparent'},
})
