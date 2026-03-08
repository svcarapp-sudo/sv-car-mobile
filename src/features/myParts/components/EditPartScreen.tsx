import {useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, Alert, ScrollView, Image} from 'react-native'
import {Text, TextInput, Button, ActivityIndicator, Icon} from 'react-native-paper'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import {useMyParts} from '../hooks/useMyParts'
import {useMakeModelCache, usePartCategories, useAppTheme} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    PART_NAME: 'اسم القطعة',
    PART_NAME_PLACEHOLDER: 'مثال: فرامل أمامية',
    DESCRIPTION: 'الوصف',
    DESCRIPTION_PLACEHOLDER: 'وصف تفصيلي للقطعة...',
    PRICE: 'السعر ($)',
    PRICE_PLACEHOLDER: '0.00',
    IMAGE_URL: 'رابط الصورة (اختياري)',
    IMAGE_URL_PLACEHOLDER: 'https://example.com/image.jpg',
    SKU: 'رمز القطعة (اختياري)',
    SKU_PLACEHOLDER: 'مثال: BP-001',
    SAVE: 'حفظ التعديلات',
    CANCEL: 'إلغاء',
    SAVING: 'جاري الحفظ...',
    LOADING: 'جاري التحميل...',
    SUCCESS: 'تم تحديث القطعة بنجاح',
    ERROR: 'فشل تحديث القطعة',
    NOT_FOUND: 'القطعة غير موجودة',
    REQUIRED: 'يرجى تعبئة اسم القطعة والسعر',
    INVALID_PRICE: 'يرجى إدخال سعر صحيح',
    OK: 'موافق',
    VEHICLE_INFO: 'معلومات المركبة',
}

interface EditPartScreenProps {
    route?: RouteProp<RootStackParamList, 'EditPart'>
    navigation?: NavigationProp<RootStackParamList>
}

export const EditPartScreen = ({route, navigation}: EditPartScreenProps) => {
    const theme = useAppTheme()
    const partId = route?.params?.partId
    const {parts, loading: partsLoading, updatePart} = useMyParts()
    const {getBySlug, categories} = usePartCategories()

    const part = parts.find(p => p.id === partId) ?? null
    const partsForCache = part ? [part] : []
    const makeModelCache = useMakeModelCache({parts: partsForCache})

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

    const makeInfo = part?.makeId ? (makeModelCache[part.makeId] as {name: string; logoUrl?: string | null} | undefined) : null
    const modelInfo = part?.modelId ? (makeModelCache[`model_${part.modelId}`] as {name: string} | undefined) : null
    const categoryInfo = part ? getBySlug(part.category) || categories.find(c => c.id === part.categoryId) : null
    const vehicleLabel = [makeInfo?.name, modelInfo?.name, part?.year].filter(Boolean).join(' ')

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

    // Loading state
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

    // Not found
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
                {/* Vehicle info banner */}
                {vehicleLabel ? (
                    <View style={[styles.vehicleBanner, {backgroundColor: theme.colors.surfaceVariant}]}>
                        {makeInfo?.logoUrl ? (
                            <Image source={{uri: makeInfo.logoUrl}} style={styles.vehicleLogo} resizeMode="contain" />
                        ) : (
                            <Icon source="car" size={20} color={theme.colors.onSurfaceVariant} />
                        )}
                        <View style={styles.vehicleTextGroup}>
                            <Text style={[styles.vehicleLabel, {color: theme.colors.onSurfaceVariant}]}>
                                {ARABIC_TEXT.VEHICLE_INFO}
                            </Text>
                            <Text style={[styles.vehicleValue, {color: theme.colors.onSurface}]}>{vehicleLabel}</Text>
                        </View>
                        {categoryInfo ? (
                            <View style={[styles.catBadge, {backgroundColor: theme.colors.primaryContainer}]}>
                                <Text style={[styles.catBadgeText, {color: theme.colors.primary}]}>{categoryInfo.name}</Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}

                {/* Form fields */}
                <TextInput
                    label={ARABIC_TEXT.PART_NAME}
                    value={name}
                    onChangeText={setName}
                    placeholder={ARABIC_TEXT.PART_NAME_PLACEHOLDER}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="tag-outline" />}
                />

                <TextInput
                    label={ARABIC_TEXT.DESCRIPTION}
                    value={description}
                    onChangeText={setDescription}
                    placeholder={ARABIC_TEXT.DESCRIPTION_PLACEHOLDER}
                    mode="outlined"
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    left={<TextInput.Icon icon="text" />}
                />

                <TextInput
                    label={ARABIC_TEXT.PRICE}
                    value={price}
                    onChangeText={setPrice}
                    placeholder={ARABIC_TEXT.PRICE_PLACEHOLDER}
                    mode="outlined"
                    keyboardType="decimal-pad"
                    style={styles.input}
                    left={<TextInput.Icon icon="cash" />}
                />

                <TextInput
                    label={ARABIC_TEXT.IMAGE_URL}
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder={ARABIC_TEXT.IMAGE_URL_PLACEHOLDER}
                    mode="outlined"
                    keyboardType="url"
                    autoCapitalize="none"
                    style={styles.input}
                    left={<TextInput.Icon icon="image-outline" />}
                />

                <TextInput
                    label={ARABIC_TEXT.SKU}
                    value={sku}
                    onChangeText={setSku}
                    placeholder={ARABIC_TEXT.SKU_PLACEHOLDER}
                    mode="outlined"
                    autoCapitalize="characters"
                    style={styles.input}
                    left={<TextInput.Icon icon="barcode" />}
                />

                {/* Actions */}
                <View style={styles.buttons}>
                    <Button mode="outlined" onPress={() => navigation?.goBack()} style={styles.btn} disabled={saving}>
                        {ARABIC_TEXT.CANCEL}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleSave}
                        style={styles.btn}
                        contentStyle={styles.saveBtnContent}
                        loading={saving}
                        disabled={saving || !name.trim() || !price.trim()}>
                        {saving ? ARABIC_TEXT.SAVING : ARABIC_TEXT.SAVE}
                    </Button>
                </View>
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
    vehicleBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        marginBottom: 20,
        gap: 10,
    },
    vehicleLogo: {
        width: 28,
        height: 28,
    },
    vehicleTextGroup: {
        flex: 1,
    },
    vehicleLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
    vehicleValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    catBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    catBadgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    input: {
        marginBottom: 14,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    btn: {
        flex: 1,
        borderRadius: 12,
    },
    saveBtnContent: {
        paddingVertical: 4,
    },
})
