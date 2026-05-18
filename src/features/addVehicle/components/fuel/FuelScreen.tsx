import {useState} from 'react'
import {StyleSheet, View, ScrollView, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'
import {HelperText, Text, Icon} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {FuelCard} from './FuelCard'

const ARABIC_TEXT = {
    HINT: 'الاختيار يحفظ المركبة فوراً',
}

export interface FuelTypeOption {
    id: string
    name: string
    icon: string
}

interface FuelScreenProps {
    fuelTypes: FuelTypeOption[]
    value: string
    onSubmit: (fuelName: string) => void | Promise<void>
    loading?: boolean
    error?: string | null
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset?: number
}

export const FuelScreen = ({
    fuelTypes,
    value,
    onSubmit,
    loading = false,
    error,
    onScroll,
    contentTopInset = 0,
}: FuelScreenProps) => {
    const theme = useAppTheme()
    const [pendingId, setPendingId] = useState<string | null>(null)

    const handleSelect = async (f: FuelTypeOption) => {
        if (loading) return
        setPendingId(f.id)
        await onSubmit(f.name)
        setPendingId(null)
    }

    return (
        <ScrollView
            contentContainerStyle={[styles.scroll, {paddingTop: contentTopInset}]}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}>
            <View style={styles.stack}>
                {fuelTypes.map(f => (
                    <FuelCard
                        key={f.id}
                        id={f.id}
                        name={f.name}
                        icon={f.icon}
                        isSelected={value === f.name}
                        isPending={pendingId === f.id && loading}
                        disabled={loading}
                        onPress={() => handleSelect(f)}
                    />
                ))}
            </View>

            <View style={styles.hintRow}>
                <Icon source='information-outline' size={14} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.hintText, {color: theme.colors.onSurfaceVariant}]}>{ARABIC_TEXT.HINT}</Text>
            </View>

            {error ? (
                <HelperText type='error' visible style={styles.errorText}>
                    {error}
                </HelperText>
            ) : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 32,
    },
    stack: {
        paddingTop: 4,
    },
    hintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
        marginTop: 14,
        opacity: 0.8,
    },
    hintText: {
        fontSize: 12,
        fontWeight: '600',
    },
    errorText: {
        marginTop: 8,
        textAlign: 'center',
    },
})
