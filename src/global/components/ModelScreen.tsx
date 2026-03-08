import {useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity, FlatList, I18nManager} from 'react-native'
import {Text, Icon, ActivityIndicator} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import type {ModelApi} from '../services/catalogService'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (makeName: string) => `لسيارة ${makeName}`,
    LOADING: 'جاري تحميل الموديلات...',
}

interface ModelScreenProps {
    makeId: number | null
    makeName: string
    getModels: (makeId: number) => Promise<ModelApi[]>
    value: string
    valueId: string | null
    onSelect: (name: string, id: string) => void
    onNext: () => void
}

export const ModelScreen = ({
    makeId,
    makeName,
    getModels,
    value: _value,
    valueId,
    onSelect,
    onNext,
}: ModelScreenProps) => {
    const theme = useAppTheme()
    const [models, setModels] = useState<ModelApi[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (makeId == null) {
            setModels([])

            return
        }

        let cancelled = false
        setLoading(true)
        getModels(makeId)
            .then(list => {
                if (!cancelled) {
                    setModels(list)
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [makeId, getModels])

    const handleSelect = (model: ModelApi) => {
        onSelect(model.name, model.id)
        onNext()
    }

    if (loading && models.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={theme.colors.tertiary} />
                <Text variant='bodyMedium' style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    const renderItem = ({item}: {item: ModelApi}) => {
        const isSelected = valueId === item.id
        const iconSource = isSelected ? 'check-circle' : 'car-side'
        const needsFlip = !isSelected && I18nManager.isRTL

        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
                style={[
                    styles.modelCard,
                    {backgroundColor: theme.colors.surface},
                    isSelected && styles.modelCardSelected,
                ]}>
                {isSelected && <View style={styles.selectedAccent} />}
                <View style={styles.modelContent}>
                    <View
                        style={[
                            styles.modelIcon,
                            {backgroundColor: isSelected ? theme.colors.accentSoft : theme.colors.surfaceVariant},
                        ]}>
                        <View style={needsFlip ? styles.flippedIcon : undefined}>
                            <Icon
                                source={iconSource}
                                size={18}
                                color={isSelected ? theme.colors.tertiary : theme.colors.onSurfaceVariant}
                            />
                        </View>
                    </View>
                    <Text
                        variant='titleMedium'
                        style={[
                            styles.modelName,
                            {color: theme.colors.onSurface},
                            isSelected && {fontWeight: '700'},
                        ]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.stepContent}>
            <View style={styles.headerContainer}>
                <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.SELECT_MODEL}
                </Text>
                <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                    {ARABIC_TEXT.FOR_MAKE(makeName)}
                </Text>
            </View>
            <FlatList
                data={models}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 20,
    },
    stepTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    stepSubtitle: {
        opacity: 0.6,
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 24,
    },
    modelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 8,
        borderWidth: 1.5,
        borderColor: 'transparent',
        overflow: 'hidden',
        shadowColor: themeColors.shadowLight,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    modelCardSelected: {
        borderColor: themeColors.tertiary,
        backgroundColor: themeColors.accentSubtle,
        shadowColor: themeColors.tertiary,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedAccent: {
        position: 'absolute',
        start: 0,
        top: 10,
        bottom: 10,
        width: 4,
        borderRadius: 2,
        backgroundColor: themeColors.tertiary,
    },
    modelContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    modelIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 14,
    },
    modelName: {
        flex: 1,
        fontWeight: '500',
    },
    flippedIcon: {
        transform: [{scaleX: -1}],
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
