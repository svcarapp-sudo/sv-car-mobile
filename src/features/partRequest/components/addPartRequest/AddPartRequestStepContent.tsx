import {useEffect, useRef} from 'react'
import {Animated, StyleSheet} from 'react-native'

import type {PartCategoryApi} from '@/global/types'

import {Step} from './addPartRequestSteps'
import {CategoryStep, ContactStep, DetailsStep, VehicleStep} from './steps'
import type {useAddPartRequestForm} from './useAddPartRequestForm'

interface AddPartRequestStepContentProps {
    form: ReturnType<typeof useAddPartRequestForm>
    categories: PartCategoryApi[]
    onAddVehicle: () => void
}

const renderBody = ({form, categories, onAddVehicle}: AddPartRequestStepContentProps) => {
    switch (form.currentStep) {
        case Step.Vehicle:
            return <VehicleStep vehicle={form.vehicle} onAddVehicle={onAddVehicle} />
        case Step.Category:
            return <CategoryStep categories={categories} selectedId={form.categoryId} onSelect={form.setCategoryId} />
        case Step.Details:
            return (
                <DetailsStep
                    fields={form.fields}
                    condition={form.condition}
                    onChangeField={form.setField}
                    onChangeCondition={form.setCondition}
                />
            )
        case Step.Contact:
            return <ContactStep fields={form.fields} budgetError={form.budgetError} onChangeField={form.setField} />
        default:
            return null
    }
}

/** Animated swap of the current step body (fade + slide on step change). */
export const AddPartRequestStepContent = (props: AddPartRequestStepContentProps) => {
    const opacity = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(8)).current

    useEffect(() => {
        opacity.setValue(0)
        translateY.setValue(8)
        Animated.parallel([
            Animated.timing(opacity, {toValue: 1, duration: 260, useNativeDriver: true}),
            Animated.spring(translateY, {toValue: 0, tension: 110, friction: 14, useNativeDriver: true}),
        ]).start()
    }, [props.form.currentStep, opacity, translateY])

    return <Animated.View style={[styles.body, {opacity, transform: [{translateY}]}]}>{renderBody(props)}</Animated.View>
}

const styles = StyleSheet.create({
    body: {flex: 1},
})
