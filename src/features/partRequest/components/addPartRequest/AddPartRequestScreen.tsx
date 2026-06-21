import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAppTheme, useCatalog} from '@/global/hooks'
import type {RootStackParamList} from '@/global/navigation/types'

import {AddPartRequestFooter} from './AddPartRequestFooter'
import {AddPartRequestProgress} from './AddPartRequestProgress'
import {AddPartRequestStepContent} from './AddPartRequestStepContent'
import {AddPartRequestStepHeader} from './AddPartRequestStepHeader'
import {STEPS, Step} from './addPartRequestSteps'
import {useAddPartRequestForm} from './useAddPartRequestForm'

interface AddPartRequestScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

export const AddPartRequestScreen = ({navigation}: AddPartRequestScreenProps) => {
    const theme = useAppTheme()
    const {categories} = useCatalog()
    const form = useAddPartRequestForm({onSuccess: () => navigation?.goBack()})
    const meta = STEPS[form.currentStep]

    const onBack = () => {
        if (form.currentStep === Step.Vehicle) navigation?.goBack()
        else form.handleStepChange((form.currentStep - 1) as Step)
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <AddPartRequestProgress currentStep={form.currentStep} onStepPress={form.handleStepChange} />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={8}>
                <View style={styles.content}>
                    <AddPartRequestStepHeader title={meta.title} subtitle={meta.subtitle} />
                    <AddPartRequestStepContent
                        form={form}
                        categories={categories}
                        onAddVehicle={() => navigation?.navigate('AddVehicle')}
                    />
                </View>
                <AddPartRequestFooter
                    currentStep={form.currentStep}
                    canProceed={form.canProceed}
                    submitting={form.submitting}
                    onBack={onBack}
                    onNext={form.handleNext}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    flex: {flex: 1},
    content: {flex: 1, paddingHorizontal: 18, paddingTop: 16},
})
