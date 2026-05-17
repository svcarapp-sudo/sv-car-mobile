import React from 'react'
import {StyleSheet, View} from 'react-native'

import {shadows, themeColors} from '@/global/theme'
import {QuickActionTile} from './QuickActionTile'

interface QuickActionsProps {
    onMyParts: () => void
    onAddPart: () => void
    onViewAll: () => void
    onMyAccount: () => void
}

const ARABIC_TEXT = {
    MY_PARTS: 'قطعي',
    ADD_PART: 'إضافة قطعة',
    BROWSE: 'كل القطع',
    ACCOUNT: 'حسابي',
}

export const QuickActions = ({onMyParts, onAddPart, onViewAll, onMyAccount}: QuickActionsProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <QuickActionTile icon='package-variant-closed' label={ARABIC_TEXT.MY_PARTS} onPress={onMyParts} />
                <QuickActionTile icon='plus' label={ARABIC_TEXT.ADD_PART} onPress={onAddPart} tone='amber' />
                <QuickActionTile icon='view-grid-outline' label={ARABIC_TEXT.BROWSE} onPress={onViewAll} />
                <QuickActionTile icon='account-outline' label={ARABIC_TEXT.ACCOUNT} onPress={onMyAccount} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 18,
        marginTop: -28,
        marginBottom: 22,
        backgroundColor: themeColors.surface,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 8,
        ...shadows.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
})
