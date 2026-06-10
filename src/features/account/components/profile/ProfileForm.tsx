import React, {useCallback, useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {ProfileEditFields} from './ProfileEditFields'
import type {ProfileFormState} from './ProfileEditFields'
import {ProfileInfoRows} from './ProfileInfoRows'

export type {ProfileFormState} from './ProfileEditFields'

const ARABIC = {
    PERSONAL_INFO: 'المعلومات الشخصية',
    EDIT: 'تعديل',
    CANCEL: 'إلغاء',
    SAVE: 'حفظ',
    SAVING: 'جاري الحفظ...',
    DISCARD_TITLE: 'تجاهل التغييرات؟',
    DISCARD_MESSAGE: 'لديك تعديلات غير محفوظة، هل تريد تجاهلها؟',
    DISCARD_CONFIRM: 'تجاهل',
    KEEP_EDITING: 'متابعة التعديل',
}

interface ProfileFormProps {
    form: ProfileFormState
    onFormChange: (patch: Partial<ProfileFormState>) => void
    onSave: () => Promise<boolean>
    onCancel: () => void
    saving: boolean
    hasChanges: boolean
}

export const ProfileForm = ({form, onFormChange, onSave, onCancel, saving, hasChanges}: ProfileFormProps) => {
    const theme = useAppTheme()
    const [editing, setEditing] = useState(false)

    const revert = useCallback(() => {
        onCancel()
        setEditing(false)
    }, [onCancel])

    const handleCancel = useCallback(() => {
        if (!hasChanges) {
            revert()
            return
        }
        Alert.alert(ARABIC.DISCARD_TITLE, ARABIC.DISCARD_MESSAGE, [
            {text: ARABIC.KEEP_EDITING, style: 'cancel'},
            {text: ARABIC.DISCARD_CONFIRM, style: 'destructive', onPress: revert},
        ])
    }, [hasChanges, revert])

    const handleSave = useCallback(async () => {
        if (await onSave()) setEditing(false)
    }, [onSave])

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text variant='titleMedium' style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
                    {ARABIC.PERSONAL_INFO}
                </Text>
                {!editing && (
                    <Button mode='text' onPress={() => setEditing(true)} compact icon='pencil-outline'>
                        {ARABIC.EDIT}
                    </Button>
                )}
            </View>

            <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
                {editing ? (
                    <>
                        <ProfileEditFields form={form} onFormChange={onFormChange} />
                        <View style={styles.actions}>
                            <Button mode='outlined' onPress={handleCancel} disabled={saving} style={styles.actionButton}>
                                {ARABIC.CANCEL}
                            </Button>
                            <Button
                                mode='contained'
                                onPress={handleSave}
                                loading={saving}
                                disabled={saving || !hasChanges || !form.name.trim()}
                                style={styles.actionButton}
                                icon='content-save-outline'>
                                {saving ? ARABIC.SAVING : ARABIC.SAVE}
                            </Button>
                        </View>
                    </>
                ) : (
                    <ProfileInfoRows form={form} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {padding: 20},
    sectionTitle: {fontWeight: '600'},
    sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    card: {
        borderRadius: 16,
        padding: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
    },
    actions: {flexDirection: 'row', gap: 12, marginTop: 8},
    actionButton: {flex: 1, borderRadius: 12},
})
