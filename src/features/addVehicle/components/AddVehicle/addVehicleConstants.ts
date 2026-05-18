export enum Step {
    Origin = 0,
    Make = 1,
    Model = 2,
    Year = 3,
    Fuel = 4,
}

export interface StepMeta {
    step: Step
    icon: string
    label: string
    title: string
    subtitle: string
}

export const STEPS: StepMeta[] = [
    {
        step: Step.Origin,
        icon: 'earth',
        label: 'المنشأ',
        title: 'اختر المنشأ',
        subtitle: 'حدد بلد المنشأ للمركبة',
    },
    {
        step: Step.Make,
        icon: 'car-side',
        label: 'الماركة',
        title: 'اختر الشركة المصنعة',
        subtitle: 'اختر ماركة المركبة من القائمة',
    },
    {
        step: Step.Model,
        icon: 'car-info',
        label: 'الموديل',
        title: 'اختر الموديل',
        subtitle: 'حدد طراز المركبة المحدد',
    },
    {
        step: Step.Year,
        icon: 'calendar-range',
        label: 'السنة',
        title: 'سنة الصنع',
        subtitle: 'اختر سنة صنع المركبة',
    },
    {
        step: Step.Fuel,
        icon: 'gas-station',
        label: 'الوقود',
        title: 'نوع الوقود',
        subtitle: 'اختر نوع الوقود لإكمال إضافة المركبة',
    },
]

export const TOTAL_STEPS = STEPS.length

export const ARABIC_TEXT = {
    STEP_OF: (current: number, total: number) => `${current} من ${total}`,
    YOUR_VEHICLE: 'مركبتك',
    LOADING: 'جارٍ التحميل…',
    SUBMIT_ERROR: 'تعذّر حفظ المركبة، حاول مجدّداً',
}
