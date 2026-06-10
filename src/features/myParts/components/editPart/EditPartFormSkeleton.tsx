import {StyleSheet, View} from 'react-native'

import {Skeleton} from '@/global/components'

/** Fetch placeholder mirroring the vehicle banner, form fields and action buttons of EditPartScreen. */
export const EditPartFormSkeleton = () => {
    return (
        <View style={styles.container}>
            <Skeleton height={88} radius={16} style={styles.banner} />
            {[0, 1, 2, 3, 4].map(index => (
                <Skeleton key={index} height={56} radius={6} style={styles.input} />
            ))}
            <View style={styles.buttons}>
                <Skeleton height={44} radius={12} style={styles.button} />
                <Skeleton height={44} radius={12} style={styles.button} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    banner: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 14,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    button: {
        flex: 1,
    },
})
