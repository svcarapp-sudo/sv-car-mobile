import {useEffect, useMemo, useRef, useState} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {Dialog, IconButton, Portal, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {Part, PartCategoryApi} from '@/global/types'

import {SORT_OPTIONS, STATUS_OPTIONS} from '../../constants/filterOptions'
import {filterParts, type MyPartsSortKey, type MyPartsStatusFilter} from '../../hooks/useMyPartsFilters'
import {FilterChipGroup, type FilterChipOption} from './FilterChipGroup'
import {FilterDialogFooter} from './FilterDialogFooter'

export interface FilterSelection {
    status: MyPartsStatusFilter
    categoryId: number | null
    sort: MyPartsSortKey
}

interface MyPartsFilterDialogProps {
    visible: boolean
    onDismiss: () => void
    status: MyPartsStatusFilter
    categoryId: number | null
    sort: MyPartsSortKey
    parts: Part[]
    search: string
    categories: PartCategoryApi[]
    onApply: (next: FilterSelection) => void
}

const T = {TITLE: 'الفلاتر', STATUS: 'الحالة', CATEGORY: 'الفئة', SORT: 'الترتيب', CLOSE: 'إغلاق', ALL_CATEGORIES: 'كل الفئات'}
const DEFAULTS: FilterSelection = {status: 'all', categoryId: null, sort: 'newest'}

export const MyPartsFilterDialog = (props: MyPartsFilterDialogProps) => {
    const {visible, onDismiss, status, categoryId, sort, parts, search, categories, onApply} = props
    const theme = useAppTheme()
    const {height} = useWindowDimensions()
    const [draft, setDraft] = useState<FilterSelection>({status, categoryId, sort})
    const wasVisible = useRef(false)

    // Re-seed the draft only on the closed→open transition, so an external
    // re-render while the dialog is open can't wipe in-progress selections.
    useEffect(() => {
        if (visible && !wasVisible.current) setDraft({status, categoryId, sort})
        wasVisible.current = visible
    }, [visible, status, categoryId, sort])

    const {statusOptions, categoryOptions, resultCount} = useMemo(() => {
        const countFor = (s: MyPartsStatusFilter, c: number | null) =>
            filterParts(parts, {status: s, categoryId: c, search}).length
        return {
            statusOptions: STATUS_OPTIONS.map(o => ({
                ...o,
                count: countFor(o.key, draft.categoryId),
            })) as FilterChipOption<MyPartsStatusFilter>[],
            categoryOptions: [
                {key: null, label: T.ALL_CATEGORIES, icon: 'shape-outline', count: countFor(draft.status, null)},
                ...categories.map(c => ({key: c.id, label: c.name, icon: c.icon, count: countFor(draft.status, c.id)})),
            ] as FilterChipOption<number | null>[],
            resultCount: countFor(draft.status, draft.categoryId),
        }
    }, [parts, search, categories, draft])

    const canReset = draft.status !== 'all' || draft.categoryId !== null || draft.sort !== 'newest'

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={[styles.dialog, {backgroundColor: theme.colors.surface}]}>
                <View style={styles.header}>
                    <Text style={[styles.title, {color: theme.colors.onSurface}]}>{T.TITLE}</Text>
                    <IconButton icon='close' size={22} onPress={onDismiss} accessibilityLabel={T.CLOSE} style={styles.close} />
                </View>
                <ScrollView
                    style={{maxHeight: height * 0.5}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>
                    <FilterChipGroup
                        title={T.STATUS}
                        options={statusOptions}
                        value={draft.status}
                        onSelect={next => setDraft(d => ({...d, status: next}))}
                    />
                    <FilterChipGroup
                        title={T.CATEGORY}
                        options={categoryOptions}
                        value={draft.categoryId}
                        onSelect={next => setDraft(d => ({...d, categoryId: next}))}
                    />
                    <FilterChipGroup
                        title={T.SORT}
                        options={SORT_OPTIONS}
                        value={draft.sort}
                        onSelect={next => setDraft(d => ({...d, sort: next}))}
                    />
                </ScrollView>
                <FilterDialogFooter
                    resultCount={resultCount}
                    canReset={canReset}
                    onReset={() => setDraft(DEFAULTS)}
                    onApply={() => onApply(draft)}
                />
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {borderRadius: 24},
    // Paper injects marginTop:24 onto the dialog's first child (v3), so we zero
    // it here and own the top spacing — otherwise top (24+pad) ≠ bottom.
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingStart: 20,
        paddingEnd: 8,
        paddingTop: 16,
        paddingBottom: 8,
    },
    close: {margin: 0},
    title: {fontSize: 18, fontWeight: '800'},
    scrollContent: {paddingHorizontal: 20, paddingTop: 6, paddingBottom: 6, gap: 16},
})
