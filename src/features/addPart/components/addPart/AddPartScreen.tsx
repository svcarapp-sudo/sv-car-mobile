import {useRef, useState} from 'react'
import {Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native'
import type {NavigationProp} from '@react-navigation/native'

import {useAddPartForm} from '../../hooks/useAddPartForm'
import {useAppTheme} from '@/global/hooks'
import {SellerProfileGate} from '../sellerProfileGate'
import {AddPartScrollHeader} from './AddPartScrollHeader'
import {AddPartProgress} from './AddPartProgress'
import {STEPS, formatYearRange} from './addPartConstants'
import {AddPartStepRenderer} from './AddPartStepRenderer'
import type {RootStackParamList} from '@/global/navigation/types'

interface AddPartScreenProps {
    navigation?: NavigationProp<RootStackParamList>
}

const HIDE_DY = 6
const SHOW_DY = 4
const TOP_PIN = 24

export const AddPartScreen = ({navigation}: AddPartScreenProps) => {
    const theme = useAppTheme()
    const form = useAddPartForm(navigation)
    const meta = STEPS[form.currentStep]
    const yearLabel = formatYearRange(form.yearFrom, form.yearTo)

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
        <SellerProfileGate>
            <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
                <AddPartProgress currentStep={form.currentStep} onStepPress={form.handleStepChange} />
                <View style={styles.contentArea}>
                    <View style={styles.stepContent}>
                        <AddPartStepRenderer
                            currentStep={form.currentStep}
                            originId={form.originId}
                            makeId={form.makeId}
                            makeName={form.makeName}
                            modelId={form.modelId}
                            modelName={form.modelName}
                            yearFrom={form.yearFrom}
                            yearTo={form.yearTo}
                            categoryId={form.categoryId}
                            categories={form.categories}
                            categoriesLoading={form.categoriesLoading}
                            name={form.name}
                            description={form.description}
                            price={form.price}
                            condition={form.condition}
                            stockQuantity={form.stockQuantity}
                            imageUrl={form.imageUrl}
                            sku={form.sku}
                            loading={form.loading}
                            getMakes={form.getMakes}
                            getModels={form.getModels}
                            years={form.years}
                            onMakeSelect={form.handleMakeSelect}
                            onModelSelect={form.handleModelSelect}
                            onYearChange={form.handleYearChange}
                            onYearNext={form.handleYearNext}
                            onCategorySelect={form.handleCategorySelect}
                            onNameChange={form.setName}
                            onDescriptionChange={form.setDescription}
                            onPriceChange={form.setPrice}
                            onConditionChange={form.setCondition}
                            onStockQuantityChange={form.setStockQuantity}
                            onImageUrlChange={form.setImageUrl}
                            onSkuChange={form.setSku}
                            onSubmit={form.handleSubmit}
                            onCancel={() => navigation?.goBack()}
                            canSubmit={form.canSubmit}
                            onScroll={handleScroll}
                            hideHeader
                            contentTopInset={headerHeight}
                        />
                    </View>
                    <AddPartScrollHeader
                        currentStep={form.currentStep}
                        title={meta.title}
                        subtitle={meta.subtitle}
                        showTitle={meta.showTitle}
                        makeName={form.makeName}
                        makeLogoUrl={form.makeLogoUrl}
                        modelName={form.modelName}
                        yearLabel={yearLabel}
                        categoryName={form.categoryName}
                        onStepPress={form.handleStepChange}
                        onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
                        translateY={translateY}
                        opacity={opacity}
                    />
                </View>
            </View>
        </SellerProfileGate>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    contentArea: {flex: 1, overflow: 'hidden'},
    stepContent: {flex: 1, paddingHorizontal: 16},
})
