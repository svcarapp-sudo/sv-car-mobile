import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'

import {MakeScreen, ModelScreen, YearScreen, CategoryScreen} from '@/global/components'
import {AddPartDetailsForm} from './AddPartDetailsForm'
import {Step} from './AddPartStepper'
import type {PartCategoryApi} from '@/global/types'
import type {MakeApi, ModelApi} from '@/global/services/catalogService'

interface AddPartStepRendererProps {
    currentStep: Step
    originId: number | null
    makeId: number | null
    makeName: string
    modelId: number | null
    modelName: string
    year: number | null
    categoryId: number | null
    categories: PartCategoryApi[]
    categoriesLoading: boolean
    name: string
    description: string
    price: string
    imageUrl: string
    sku: string
    loading: boolean
    getMakes: (originId?: number | null) => Promise<MakeApi[]>
    getModels: (makeId: number) => Promise<ModelApi[]>
    years: number[]
    onMakeSelect: (name: string, id: string, logoUrl?: string | null) => void
    onModelSelect: (name: string, id: string) => void
    onYearSelect: (yearStr: string) => void
    onCategorySelect: (id: number, name: string) => void
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onPriceChange: (value: string) => void
    onImageUrlChange: (value: string) => void
    onSkuChange: (value: string) => void
    onSubmit: () => void
    onCancel: () => void
    canSubmit: boolean
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    hideHeader?: boolean
    contentTopInset?: number
}

export const AddPartStepRenderer = (props: AddPartStepRendererProps) => {
    switch (props.currentStep) {
        case Step.Make:
            return (
                <MakeScreen
                    originId={props.originId}
                    getMakes={props.getMakes}
                    value={props.makeName}
                    valueId={props.makeId?.toString() || null}
                    onSelect={props.onMakeSelect}
                    onNext={() => {}}
                    onScroll={props.onScroll}
                    hideHeader={props.hideHeader}
                    contentTopInset={props.contentTopInset}
                />
            )
        case Step.Model:
            return props.makeId ? (
                <ModelScreen
                    makeId={props.makeId}
                    makeName={props.makeName}
                    getModels={async (id: number) => props.getModels(id)}
                    value={props.modelName}
                    valueId={props.modelId?.toString() || null}
                    onSelect={props.onModelSelect}
                    onNext={() => {}}
                    onScroll={props.onScroll}
                    hideHeader={props.hideHeader}
                    contentTopInset={props.contentTopInset}
                />
            ) : null
        case Step.Year:
            return (
                <YearScreen
                    years={props.years}
                    value={props.year?.toString() || ''}
                    onSelect={props.onYearSelect}
                    onNext={() => {}}
                    onScroll={props.onScroll}
                    hideHeader={props.hideHeader}
                    contentTopInset={props.contentTopInset}
                />
            )
        case Step.Category:
            return (
                <CategoryScreen
                    categories={props.categories}
                    loading={props.categoriesLoading}
                    valueId={props.categoryId}
                    onSelect={props.onCategorySelect}
                    onNext={() => {}}
                    onScroll={props.onScroll}
                    hideHeader={props.hideHeader}
                    contentTopInset={props.contentTopInset}
                />
            )
        case Step.Details:
            return (
                <AddPartDetailsForm
                    name={props.name}
                    description={props.description}
                    price={props.price}
                    imageUrl={props.imageUrl}
                    sku={props.sku}
                    loading={props.loading}
                    onNameChange={props.onNameChange}
                    onDescriptionChange={props.onDescriptionChange}
                    onPriceChange={props.onPriceChange}
                    onImageUrlChange={props.onImageUrlChange}
                    onSkuChange={props.onSkuChange}
                    onSubmit={props.onSubmit}
                    onCancel={props.onCancel}
                    canSubmit={props.canSubmit}
                    onScroll={props.onScroll}
                    hideHeader={props.hideHeader}
                    contentTopInset={props.contentTopInset}
                />
            )
        default:
            return null
    }
}
