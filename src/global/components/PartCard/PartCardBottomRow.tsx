import {StyleSheet, View, Image} from 'react-native'
import {Icon, Text} from 'react-native-paper'
import {useAppTheme} from '@/global/hooks'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardBottomRowProps {
    part: Part
    makeInfo?: {name: string; logoUrl?: string | null} | null
    modelInfo?: {name: string} | null
    categoryInfo?: PartCategoryApi | null
}

export const PartCardBottomRow = ({part, makeInfo, modelInfo, categoryInfo}: PartCardBottomRowProps) => {
    const theme = useAppTheme()
    const hasVehicleInfo = makeInfo || modelInfo || part.year

    if (!hasVehicleInfo && !categoryInfo) {
        return null
    }

    return (
        <View style={[styles.bottomRow, {borderTopColor: theme.colors.outline}]}>
            {hasVehicleInfo && (
                <View style={styles.vehicleRow}>
                    {makeInfo && (
                        <View style={styles.vehicleChip}>
                            {makeInfo.logoUrl ? (
                                <Image source={{uri: makeInfo.logoUrl}} style={styles.makeLogo} resizeMode='contain' />
                            ) : (
                                <Icon source='car' size={12} color={theme.colors.onSurfaceVariant} />
                            )}
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                                {makeInfo.name}
                            </Text>
                        </View>
                    )}
                    {modelInfo && (
                        <View style={styles.vehicleChip}>
                            <Text style={[styles.vehicleSep, {color: theme.colors.outline}]}>{'\u2022'}</Text>
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>
                                {modelInfo.name}
                            </Text>
                        </View>
                    )}
                    {part.year && (
                        <View style={styles.vehicleChip}>
                            <Text style={[styles.vehicleSep, {color: theme.colors.outline}]}>{'\u2022'}</Text>
                            <Text style={[styles.vehicleText, {color: theme.colors.onSurfaceVariant}]}>{part.year}</Text>
                        </View>
                    )}
                </View>
            )}
            {categoryInfo && (
                <View style={[styles.categoryTag, {backgroundColor: theme.colors.primaryContainer}]}>
                    <Icon source={categoryInfo.icon || 'tag'} size={12} color={theme.colors.primary} />
                    <Text style={[styles.categoryText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        gap: 4,
    },
    vehicleChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    makeLogo: {
        width: 14,
        height: 14,
    },
    vehicleText: {
        fontSize: 11,
        letterSpacing: 0.2,
    },
    vehicleSep: {
        fontSize: 11,
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginStart: 8,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
})
