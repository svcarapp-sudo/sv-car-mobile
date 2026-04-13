import {useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, Alert, ScrollView} from 'react-native'
import {Text, ActivityIndicator, Icon} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useMyParts} from '../../hooks/useMyParts'
import {useCatalog, useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'
import {EditPartVehicleBanner} from './EditPartVehicleBanner'
import {EditPartFormFields} from './EditPartFormFields'

const ARABIC_TEXT = {
    LOADING: 'جاري التحميل...',
    SUCCESS: 'تم تحديث القطعة بنجاح',
    ERROR: 'فشل تحديث القطعة',
    NOT_FOUND: 'القطعة غير موجودة',
    REQUIRED: 'يرجى تعبئة اسم القطعة والسعر',
    INVALID_PRICE: 'يرجى إدخال سعر صحيح',
    OK: 'موافق',
}

interface EditPartScreenProps {
    route?: RouteProp<RootStackParamList, 'EditPart'>
    navigation?: NavigationProp<RootStackParamList>
}

export const EditPartScreen = ({route, navigation}: EditPartScreenProps) => {
    const theme = useAppTheme()
    const partId = route?.params?.partId
    const {parts, loading: partsLoading, updatePart} = useMyParts()
    const part = parts.find(p => p.id === partId) ?? null
    const {getBySlug, categories} = useCatalog()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [sku, setSku] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (part) {
            setName(part.name)
            setDescription(part.description || '')
            setPrice(part.price.toString())
            setImageUrl(part.imageUrl || '')
            setSku(part.sku || '')
        }
    }, [part?.id])

    const categoryInfo = part ? getBySlug(part.category) || categories.find(c => c.id === part.categoryId) : null
    const vehicles = part?.compatibleVehicles ?? []

    const handleSave = useCallback(async () => {
        if (!partId) return
        if (!name.trim() || !price.trim()) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.REQUIRED)
            return
        }
        const priceNum = parseFloat(price)
        if (isNaN(priceNum) || priceNum < 0) {
            Alert.alert(ARABIC_TEXT.ERROR, ARABIC_TEXT.INVALID_PRICE)
            return
        }

        setSaving(true)
        try {
            await updatePart(partId, {
                name: name.trim(),
                description: description.trim() || undefined,
                price: priceNum,
                imageUrl: imageUrl.trim() || undefined,
                sku: sku.trim() || undefined,
            })
            Alert.alert(ARABIC_TEXT.SUCCESS, '', [{text: ARABIC_TEXT.OK, onPress: () => navigation?.goBack()}])
        } catch (err) {
            Alert.alert(ARABIC_TEXT.ERROR, err instanceof Error ? err.message : ARABIC_TEXT.ERROR)
        } finally {
            setSaving(false)
        }
    }, [partId, name, description, price, imageUrl, sku, updatePart, navigation])

    if (partsLoading && !part) {
        return (
            <View style={[styles.container, styles.centered, {backgroundColor: theme.colors.background}]}>
                <ActivityIndicator size="large" />
                <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant, marginTop: 16}}>
                    {ARABIC_TEXT.LOADING}
                </Text>
            </View>
        )
    }

    if (!part) {
        return (
            <View style={[styles.container, styles.centered, {backgroundColor: theme.colors.background}]}>
                <Icon source="alert-circle-outline" size={48} color={theme.colors.error} />
                <Text variant="bodyLarge" style={{color: theme.colors.error, marginTop: 12}}>
                    {ARABIC_TEXT.NOT_FOUND}
                </Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <EditPartVehicleBanner
                    vehicles={vehicles}
                    categoryName={categoryInfo?.name}
                />
                <EditPartFormFields
                    name={name}
                    onNameChange={setName}
                    description={description}
                    onDescriptionChange={setDescription}
                    price={price}
                    onPriceChange={setPrice}
                    imageUrl={imageUrl}
                    onImageUrlChange={setImageUrl}
                    sku={sku}
                    onSkuChange={setSku}
                    saving={saving}
                    onSave={handleSave}
                    onCancel={() => navigation?.goBack()}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
})
