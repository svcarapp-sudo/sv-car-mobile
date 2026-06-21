export enum Step {
    Vehicle = 0,
    Category = 1,
    Details = 2,
    Contact = 3,
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
        step: Step.Vehicle,
        icon: 'car-side',
        label: 'المركبة',
        title: 'حدد المركبة',
        subtitle: 'اختر المركبة التي تحتاج لها القطعة',
    },
    {
        step: Step.Category,
        icon: 'shape-outline',
        label: 'الفئة',
        title: 'فئة القطعة',
        subtitle: 'اختر تصنيف القطعة المطلوبة',
    },
    {
        step: Step.Details,
        icon: 'text-box-outline',
        label: 'التفاصيل',
        title: 'تفاصيل الطلب',
        subtitle: 'صف القطعة بدقة لتصل لأفضل البائعين',
    },
    {
        step: Step.Contact,
        icon: 'phone-outline',
        label: 'التواصل',
        title: 'الميزانية والتواصل',
        subtitle: 'حدد ميزانيتك وكيف يصلك البائعون',
    },
]

export const TOTAL_STEPS = STEPS.length

export const ARABIC_TEXT = {
    STEP_OF: (current: number, total: number) => `${current} من ${total}`,
    NEXT: 'التالي',
    BACK: 'السابق',
    CANCEL: 'إلغاء',
    SUBMIT: 'نشر الطلب',
}
