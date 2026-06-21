import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {ListSearchBar} from '../listSearchBar'

const ARABIC_TEXT = {
    SELECT_MODEL: 'اختر الموديل',
    FOR_MAKE: (makeName: string) => `لسيارة ${makeName}`,
    SEARCH_PLACEHOLDER: 'ابحث عن الموديل...',
}

interface ModelListHeaderProps {
    makeName: string
    query: string
    onQueryChange: (text: string) => void
    hideHeader?: boolean
    hideSearch?: boolean
}

/** List header for the model picker: title/subtitle and/or the search bar. */
export const ModelListHeader = ({makeName, query, onQueryChange, hideHeader, hideSearch}: ModelListHeaderProps) => {
    const theme = useAppTheme()

    if (hideHeader && hideSearch) return null

    return (
        <View style={styles.listHeader}>
            {!hideHeader && (
                <View>
                    <Text variant='headlineSmall' style={[styles.stepTitle, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.SELECT_MODEL}
                    </Text>
                    <Text variant='bodyMedium' style={[styles.stepSubtitle, {color: theme.colors.onSurfaceVariant}]}>
                        {ARABIC_TEXT.FOR_MAKE(makeName)}
                    </Text>
                </View>
            )}
            {!hideSearch && (
                <ListSearchBar value={query} onChangeText={onQueryChange} placeholder={ARABIC_TEXT.SEARCH_PLACEHOLDER} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {gap: 14, marginBottom: 16},
    stepTitle: {fontWeight: '700', marginBottom: 4},
    stepSubtitle: {opacity: 0.6, fontSize: 14},
})
