import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {useSellerProfileCard} from '../../hooks'
import {SellerProfileDisplay} from './SellerProfileDisplay'
import {SellerProfileEmpty} from './SellerProfileEmpty'
import {SellerProfileForm} from './SellerProfileForm'

const ARABIC = {
    SELLER_PROFILE: 'الملف التجاري',
}

/** Seller-profile section of My Account: loading → display / empty / create-edit form. */
export const SellerProfileCard = () => {
    const theme = useAppTheme()
    const {
        loading,
        sellerProfile,
        sellerTypes,
        editing,
        creating,
        saving,
        form,
        error,
        setForm,
        startCreate,
        startEdit,
        cancelForm,
        handleSave,
    } = useSellerProfileCard()

    if (loading) {
        return (
            <View style={styles.section}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.SELLER_PROFILE}
                </Text>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='small' color={theme.colors.primary} />
                </View>
            </View>
        )
    }

    if (editing || creating) {
        return (
            <SellerProfileForm
                creating={creating}
                saving={saving}
                form={form}
                sellerTypes={sellerTypes}
                error={error}
                onFormChange={setForm}
                onCancel={cancelForm}
                onSave={() => void handleSave()}
            />
        )
    }

    if (!sellerProfile) {
        return <SellerProfileEmpty onCreatePress={startCreate} />
    }

    return <SellerProfileDisplay sellerProfile={sellerProfile} onEditPress={startEdit} />
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600', marginBottom: 16},
    loadingContainer: {paddingVertical: 24, alignItems: 'center'},
})
