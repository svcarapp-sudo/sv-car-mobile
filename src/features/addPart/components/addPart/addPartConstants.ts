export enum Step {
    Make = 0,
    Model = 1,
    Year = 2,
    Category = 3,
    Details = 4,
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
        step: Step.Make,
        icon: 'car-side',
        label: 'الماركة',
        title: 'اختر الشركة المصنعة',
        subtitle: 'حدد ماركة السيارة التي تتوافق معها القطعة',
    },
    {
        step: Step.Model,
        icon: 'car-info',
        label: 'الموديل',
        title: 'اختر الموديل',
        subtitle: 'حدد طراز السيارة المطلوب',
    },
    {
        step: Step.Year,
        icon: 'calendar-range',
        label: 'السنة',
        title: 'سنة الصنع',
        subtitle: 'اختر سنة صنع السيارة المتوافقة',
    },
    {
        step: Step.Category,
        icon: 'shape',
        label: 'الفئة',
        title: 'اختر فئة القطعة',
        subtitle: 'حدد التصنيف المناسب لهذه القطعة',
    },
    {
        step: Step.Details,
        icon: 'card-text-outline',
        label: 'التفاصيل',
        title: 'تفاصيل القطعة',
        subtitle: 'أضف الاسم والسعر والوصف لإتمام النشر',
    },
]

export const TOTAL_STEPS = STEPS.length

export const ARABIC_TEXT = {
    STEP_OF: (current: number, total: number) => `${current} من ${total}`,
    YOUR_PART: 'قطعتك',
}
