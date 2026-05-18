import {useEffect, useRef} from 'react'
import {Animated, StyleSheet, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native'

import {MakeScreen, ModelScreen, YearScreen} from '@/global/components'
import type {useCatalog} from '@/global/hooks'

import {Step} from './addVehicleConstants'
import {OriginScreen} from '../origin'
import {FuelScreen} from '../fuel'

interface AddVehicleStepContentProps {
    currentStep: Step
    vehicleInfo: ReturnType<typeof useCatalog>
    originId: number | null
    make: string
    makeId: string | null
    model: string
    modelId: string | null
    year: string
    fuelType: string
    submitLoading: boolean
    submitError: string | null
    onOriginSelect: (id: number, name: string) => void
    onMakeSelect: (name: string, id: string, logoUrl?: string | null) => void
    onModelSelect: (name: string, id: string) => void
    onYearSelect: (year: string) => void
    onFuelSubmit: (fuel: string) => void | Promise<void>
    onNext: () => void
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    contentTopInset: number
}

const renderBody = (props: AddVehicleStepContentProps) => {
    const {currentStep, vehicleInfo, originId, make, makeId, model, modelId, year, fuelType, onScroll, contentTopInset} = props

    switch (currentStep) {
        case Step.Origin:
            return (
                <OriginScreen
                    origins={vehicleInfo.origins}
                    loading={vehicleInfo.originsLoading}
                    value={originId}
                    onSelect={props.onOriginSelect}
                    onNext={props.onNext}
                    onScroll={onScroll}
                    contentTopInset={contentTopInset}
                />
            )
        case Step.Make:
            return (
                <MakeScreen
                    originId={originId}
                    getMakes={vehicleInfo.getMakes}
                    value={make}
                    valueId={makeId}
                    onSelect={props.onMakeSelect}
                    onNext={props.onNext}
                    hideHeader
                    onScroll={onScroll}
                    contentTopInset={contentTopInset}
                />
            )
        case Step.Model:
            return (
                <ModelScreen
                    makeId={makeId ? Number(makeId) : null}
                    makeName={make}
                    getModels={vehicleInfo.getModels}
                    value={model}
                    valueId={modelId}
                    onSelect={props.onModelSelect}
                    onNext={props.onNext}
                    hideHeader
                    onScroll={onScroll}
                    contentTopInset={contentTopInset}
                />
            )
        case Step.Year:
            return (
                <YearScreen
                    years={vehicleInfo.years}
                    value={year}
                    onSelect={props.onYearSelect}
                    onNext={props.onNext}
                    hideHeader
                    onScroll={onScroll}
                    contentTopInset={contentTopInset}
                />
            )
        case Step.Fuel:
            return (
                <FuelScreen
                    fuelTypes={vehicleInfo.fuelTypes}
                    value={fuelType}
                    onSubmit={props.onFuelSubmit}
                    loading={props.submitLoading}
                    error={props.submitError}
                    onScroll={onScroll}
                    contentTopInset={contentTopInset}
                />
            )
        default:
            return null
    }
}

export const AddVehicleStepContent = (props: AddVehicleStepContentProps) => {
    const opacity = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(8)).current

    useEffect(() => {
        opacity.setValue(0)
        translateY.setValue(8)
        Animated.parallel([
            Animated.timing(opacity, {toValue: 1, duration: 260, useNativeDriver: true}),
            Animated.spring(translateY, {toValue: 0, tension: 110, friction: 14, useNativeDriver: true}),
        ]).start()
    }, [props.currentStep, opacity, translateY])

    return <Animated.View style={[styles.body, {opacity, transform: [{translateY}]}]}>{renderBody(props)}</Animated.View>
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
})
