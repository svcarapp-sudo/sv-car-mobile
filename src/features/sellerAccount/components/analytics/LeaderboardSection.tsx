import {Fragment} from 'react'
import {StyleSheet, View} from 'react-native'
import {Divider, Text} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'
import type {TopPart} from '../../types'
import {AnalyticsSection} from './AnalyticsSection'
import {LeaderboardRow} from './LeaderboardRow'

const ARABIC = {TITLE: 'الأكثر مشاهدة', EMPTY: 'لا توجد قطع لعرضها بعد'}

interface LeaderboardSectionProps {
    topParts: TopPart[]
}

/** Most-viewed parts leaderboard; divider-separated ranked rows. */
export const LeaderboardSection = ({topParts}: LeaderboardSectionProps) => {
    const theme = useAppTheme()

    return (
        <AnalyticsSection title={ARABIC.TITLE}>
            {topParts.length === 0 ? (
                <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>{ARABIC.EMPTY}</Text>
            ) : (
                <View>
                    {topParts.map((part, i) => (
                        <Fragment key={part.id}>
                            {i > 0 && <Divider style={{backgroundColor: theme.colors.outlineVariant}} />}
                            <LeaderboardRow part={part} rank={i + 1} />
                        </Fragment>
                    ))}
                </View>
            )}
        </AnalyticsSection>
    )
}

const styles = StyleSheet.create({
    empty: {fontSize: 12.5, fontWeight: '600', paddingVertical: 6},
})
