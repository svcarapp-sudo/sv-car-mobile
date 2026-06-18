import {useEffect, useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, IconButton, Modal, Portal, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

import {catalogApi, type MakeApi} from '../../services/catalogService'
import {Skeleton} from '../skeleton'
import {showToast} from '../toast'
import {MakeMultiSelectGrid} from './MakeMultiSelectGrid'

export interface MakeOption {
    id: string
    name: string
    logoUrl: string | null
}

const ARABIC = {
    TITLE: 'اختر ماركات التخصص',
    SUBTITLE: (n: number, max: number) => `${n} من ${max} محددة`,
    DONE: 'تم',
    CLEAR: 'مسح',
    MAX: (max: number) => `يمكنك اختيار ${max} ماركات كحد أقصى`,
    CLOSE: 'إغلاق',
}

interface MakeMultiSelectModalProps {
    visible: boolean
    initialSelected: MakeOption[]
    maxSelections?: number
    onDismiss: () => void
    onConfirm: (selected: MakeOption[]) => void
}

/** Full-surface multi-select picker for car makes — the M3 pattern for large option sets. */
export const MakeMultiSelectModal = ({
    visible,
    initialSelected,
    maxSelections = 10,
    onDismiss,
    onConfirm,
}: MakeMultiSelectModalProps) => {
    const theme = useAppTheme()
    const [makes, setMakes] = useState<MakeApi[]>([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<Record<string, MakeOption>>({})

    useEffect(() => {
        if (!visible) return
        setQuery('')
        setSelected(Object.fromEntries(initialSelected.map(m => [m.id, m])))
        if (makes.length > 0) return
        setLoading(true)
        catalogApi
            .getMakes()
            .then(setMakes)
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    const toggle = (make: MakeApi) => {
        // MakeApi.id can arrive as a number at runtime; normalise to string so the
        // selected map keys, the Set, and MakeOption.id all stay consistent.
        const key = String(make.id)
        setSelected(prev => {
            if (prev[key]) {
                const {[key]: _removed, ...rest} = prev
                return rest
            }
            if (Object.keys(prev).length >= maxSelections) {
                showToast(ARABIC.MAX(maxSelections), 'info')
                return prev
            }
            return {...prev, [key]: {id: key, name: make.name, logoUrl: make.logoUrl ?? null}}
        })
    }

    const selectedIds = useMemo(() => new Set(Object.keys(selected)), [selected])
    const count = selectedIds.size

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[styles.modal, {backgroundColor: theme.colors.background}]}>
                <View style={[styles.header, {borderBottomColor: theme.colors.outlineVariant}]}>
                    <IconButton icon='close' size={22} onPress={onDismiss} accessibilityLabel={ARABIC.CLOSE} />
                    <View style={styles.headerText}>
                        <Text variant='titleMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                            {ARABIC.TITLE}
                        </Text>
                        <Text variant='labelSmall' style={{color: theme.colors.tertiary}}>
                            {ARABIC.SUBTITLE(count, maxSelections)}
                        </Text>
                    </View>
                    <Button mode='text' compact disabled={count === 0} onPress={() => setSelected({})}>
                        {ARABIC.CLEAR}
                    </Button>
                </View>

                {loading && makes.length === 0 ? (
                    <View style={styles.skeleton}>
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <Skeleton key={i} width='30%' height={96} radius={14} style={styles.skeletonCell} />
                        ))}
                    </View>
                ) : (
                    <MakeMultiSelectGrid
                        makes={makes}
                        selectedIds={selectedIds}
                        query={query}
                        onQueryChange={setQuery}
                        onToggle={toggle}
                    />
                )}

                <View style={[styles.footer, {borderTopColor: theme.colors.outlineVariant}]}>
                    <Button
                        mode='contained'
                        onPress={() => onConfirm(Object.values(selected))}
                        buttonColor={theme.colors.primary}
                        style={styles.doneBtn}
                        contentStyle={styles.doneContent}>
                        {`${ARABIC.DONE} (${count})`}
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modal: {marginHorizontal: 12, marginVertical: 48, borderRadius: 22, overflow: 'hidden', flex: 1},
    header: {flexDirection: 'row', alignItems: 'center', gap: 4, paddingEnd: 8, borderBottomWidth: StyleSheet.hairlineWidth},
    headerText: {flex: 1, gap: 1},
    title: {fontWeight: '800'},
    skeleton: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 16},
    skeletonCell: {marginBottom: 4},
    footer: {padding: 12, borderTopWidth: StyleSheet.hairlineWidth},
    doneBtn: {borderRadius: 14},
    doneContent: {paddingVertical: 6},
})
