import {useRef, useState} from 'react'
import {Animated, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'
import type {NavigationProp, RouteProp} from '@react-navigation/native'

import type {RootStackParamList} from '@/global/navigation/types'
import {resetMainTo} from '@/global/navigation/navActions'
import {useAppTheme, useCatalog} from '@/global/hooks'

import {AddVehicleProgress} from './AddVehicleProgress'
import {AddVehicleScrollHeader} from './AddVehicleScrollHeader'
import {AddVehicleStepContent} from './AddVehicleStepContent'
import {STEPS} from './addVehicleConstants'
import {useAddVehicleForm} from './useAddVehicleForm'

interface AddVehicleScreenProps {
    navigation?: NavigationProp<RootStackParamList>
    route?: RouteProp<RootStackParamList, 'AddVehicle'>
}

const HIDE_DY = 6
const SHOW_DY = 4
const TOP_PIN = 24

export const AddVehicleScreen = ({route}: AddVehicleScreenProps) => {
    const theme = useAppTheme()
    const vehicleInfo = useCatalog()
    const editVehicleId = route?.params?.vehicleId
    // Reset to Home so the vehicle screen lands on a clean root (menu + favorites),
    // even when Add Vehicle was reached from a flow that cleared Home off the stack.
    const form = useAddVehicleForm({editVehicleId, onSuccess: () => resetMainTo('Home')})

    const meta = STEPS[form.currentStep]
    const [headerHeight, setHeaderHeight] = useState(0)
    const headerVisible = useRef(new Animated.Value(1)).current
    const lastY = useRef(0)
    const direction = useRef<'up' | 'down' | null>(null)

    const animateTo = (toValue: 0 | 1) => {
        Animated.timing(headerVisible, {
            toValue,
            duration: toValue === 1 ? 200 : 220,
            useNativeDriver: true,
        }).start()
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y
        const dy = y - lastY.current
        lastY.current = y

        if (y < TOP_PIN) {
            if (direction.current !== 'up') {
                direction.current = 'up'
                animateTo(1)
            }
            return
        }
        if (dy > HIDE_DY && direction.current !== 'down') {
            direction.current = 'down'
            animateTo(0)
        } else if (dy < -SHOW_DY && direction.current !== 'up') {
            direction.current = 'up'
            animateTo(1)
        }
    }

    const translateY = headerVisible.interpolate({inputRange: [0, 1], outputRange: [-headerHeight, 0]})
    const opacity = headerVisible.interpolate({inputRange: [0, 1], outputRange: [0, 1]})

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <AddVehicleProgress currentStep={form.currentStep} onStepPress={form.handleStepChange} />

            <View style={styles.contentArea}>
                <View style={styles.stepContent}>
                    <AddVehicleStepContent
                        currentStep={form.currentStep}
                        vehicleInfo={vehicleInfo}
                        originId={form.originId}
                        make={form.make}
                        makeId={form.makeId}
                        model={form.model}
                        modelId={form.modelId}
                        year={form.year}
                        fuelType={form.fuelType}
                        submitLoading={form.submitLoading}
                        submitError={form.submitError}
                        onOriginSelect={form.selectOrigin}
                        onMakeSelect={form.selectMake}
                        onModelSelect={form.selectModel}
                        onYearSelect={form.setYear}
                        onFuelSubmit={form.selectFuelAndSubmit}
                        onNext={form.handleNext}
                        onScroll={handleScroll}
                        contentTopInset={headerHeight}
                    />
                </View>

                <AddVehicleScrollHeader
                    currentStep={form.currentStep}
                    title={meta.title}
                    subtitle={meta.subtitle}
                    originName={form.originName}
                    make={form.make}
                    makeLogoUrl={form.makeLogoUrl}
                    model={form.model}
                    year={form.year}
                    fuelType={form.fuelType}
                    onStepPress={form.handleStepChange}
                    onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
                    translateY={translateY}
                    opacity={opacity}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentArea: {
        flex: 1,
        overflow: 'hidden',
    },
    stepContent: {
        flex: 1,
        paddingHorizontal: 18,
    },
})
