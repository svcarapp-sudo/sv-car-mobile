import {StyleSheet, View, ScrollView, Image} from 'react-native'
import {Card, Text, IconButton} from 'react-native-paper'
import {Step} from './AddVehicleStepper'

interface AddVehicleSummaryCardProps {
    originName?: string
    make?: string
    makeLogoUrl?: string | null
    model?: string
    year?: string
    fuelType?: string
    onEdit: () => void
}

export const AddVehicleSummaryCard = ({
    originName,
    make,
    makeLogoUrl,
    model,
    year,
    fuelType,
    onEdit,
}: AddVehicleSummaryCardProps) => {
    if (!originName && !make && !model && !year && !fuelType) {
        return null
    }

    return (
        <Card style={styles.summaryCard} mode='outlined'>
            <Card.Content style={styles.summaryContent}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.summaryScrollContent}
                    style={styles.summaryScroll}>
                    {originName && (
                        <View style={styles.summaryItem}>
                            <View style={styles.textGroup}>
                                <Text variant='labelSmall' style={styles.label}>
                                    المنشأ
                                </Text>
                                <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                    {originName}
                                </Text>
                            </View>
                        </View>
                    )}
                    {make && (
                        <>
                            {originName && <View style={styles.divider} />}
                            <View style={styles.summaryItem}>
                                {makeLogoUrl ? (
                                    <View style={styles.logoCircle}>
                                        <Image source={{uri: makeLogoUrl}} style={styles.summaryLogo} resizeMode='contain' />
                                    </View>
                                ) : null}
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        الماركة
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                        {make}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                    {model && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.summaryItem}>
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        الموديل
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                        {model}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                    {year && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.summaryItem}>
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        السنة
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                        {year}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                    {fuelType && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.summaryItem}>
                                <View style={styles.textGroup}>
                                    <Text variant='labelSmall' style={styles.label}>
                                        نوع الوقود
                                    </Text>
                                    <Text variant='titleSmall' style={styles.value} numberOfLines={1}>
                                        {fuelType}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </ScrollView>
                <IconButton icon='pencil-outline' size={20} onPress={onEdit} style={styles.editButton} />
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    summaryCard: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderColor: '#E2E8F0',
    },
    summaryContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    summaryScroll: {
        flex: 1,
        minWidth: 0,
    },
    summaryScrollContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    summaryItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        maxWidth: 160,
    },
    logoCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    summaryLogo: {
        width: 20,
        height: 20,
    },
    textGroup: {
        alignItems: 'flex-end',
        minWidth: 0,
        maxWidth: 140,
    },
    label: {
        color: '#64748B',
        fontSize: 10,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 16,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    editButton: {
        margin: 0,
        marginRight: 'auto',
    },
})
