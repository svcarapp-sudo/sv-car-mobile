import {StyleSheet, View} from 'react-native'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {PartCardTopRow} from './PartCardTopRow'
import {PartCardBottomRow} from './PartCardBottomRow'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardContentProps {
    part: Part
    makeInfo?: {name: string; logoUrl?: string | null} | null
    modelInfo?: {name: string} | null
    categoryInfo?: PartCategoryApi | null
    showStockStatus?: boolean
}

export const PartCardContent = ({part, makeInfo, modelInfo, categoryInfo, showStockStatus = false}: PartCardContentProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <PartCardTopRow part={part} categoryInfo={categoryInfo} showStockStatus={showStockStatus} />
            <PartCardBottomRow part={part} makeInfo={makeInfo} modelInfo={modelInfo} categoryInfo={categoryInfo} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 12,
        padding: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
})
