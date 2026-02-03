import {StyleSheet, View} from 'react-native'
import {Text, List, useTheme, ActivityIndicator} from 'react-native-paper'

import type {OriginApi} from '../services'

const ARABIC_TEXT = {
    SELECT_ORIGIN: 'اختر المنشأ',
}

interface OriginScreenProps {
    origins: OriginApi[]
    loading: boolean
    value: number | null
    onSelect: (originId: number, originName: string) => void
    onNext: () => void
}

export const OriginScreen = ({origins, loading, value, onSelect, onNext}: OriginScreenProps) => {
    const theme = useTheme()

    const handleSelect = (origin: OriginApi) => {
        onSelect(origin.id, origin.name)
        onNext()
    }

    if (loading && origins.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    جاري تحميل المنشأ...
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.stepContent}>
            <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.SELECT_ORIGIN}
            </Text>
            <View style={styles.listContainer}>
                {(origins ?? []).map(origin => {
                    const isSelected = value === origin.id

                    return (
                        <List.Item
                            key={origin.id}
                            title={origin.name}
                            titleStyle={{fontWeight: isSelected ? 'bold' : 'normal'}}
                            left={props => (
                                <List.Icon
                                    {...props}
                                    icon={isSelected ? 'check-circle' : 'earth'}
                                    color={isSelected ? theme.colors.primary : theme.colors.outline}
                                />
                            )}
                            onPress={() => handleSelect(origin)}
                            style={[
                                styles.listItem,
                                {backgroundColor: theme.colors.surface},
                                isSelected && {
                                    backgroundColor: theme.colors.primaryContainer,
                                    borderColor: theme.colors.primary,
                                    borderWidth: 1,
                                },
                            ]}
                        />
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        marginBottom: 24,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
    },
    listItem: {
        borderRadius: 12,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
