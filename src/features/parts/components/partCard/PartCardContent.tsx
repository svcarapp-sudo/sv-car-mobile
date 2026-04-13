import {StyleSheet, View} from 'react-native'
import {useAppTheme} from '@/global/hooks'
import {themeColors} from '@/global/theme'
import {PartCardImage} from './PartCardImage'
import {PartCardDetails} from './PartCardDetails'
import type {Part, PartCategoryApi} from '@/global/types'

interface PartCardContentProps {
    part: Part
    categoryInfo?: PartCategoryApi | null
}

export const PartCardContent = ({part, categoryInfo}: PartCardContentProps) => {
    const theme = useAppTheme()

    return (
        <View style={[styles.card, {backgroundColor: theme.colors.surface}]}>
            <PartCardImage imageUrl={part.imageUrl} categoryIcon={categoryInfo?.icon} />
            <PartCardDetails part={part} categoryInfo={categoryInfo} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        marginBottom: 10,
        padding: 12,
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
})
