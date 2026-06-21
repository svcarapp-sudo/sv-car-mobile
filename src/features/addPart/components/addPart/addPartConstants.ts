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
    showTitle: boolean
}

export const STEPS: StepMeta[] = [
    {
        step: Step.Make,
        icon: 'car-side',
        label: 'الماركة',
        title: 'اختر الشركة المصنعة',
        subtitle: 'حدد ماركة السيارة التي تتوافق معها القطعة',
        showTitle: true,
    },
    {
        step: Step.Model,
        icon: 'car-info',
        label: 'الموديل',
        title: 'اختر الموديل',
        subtitle: 'حدد طراز السيارة المطلوب',
        showTitle: false,
    },
    {
        step: Step.Year,
        icon: 'calendar-range',
        label: 'السنة',
        title: 'سنة الصنع',
        subtitle: 'اختر سنوات السيارة المتوافقة',
        showTitle: false,
    },
    {
        step: Step.Category,
        icon: 'shape',
        label: 'الفئة',
        title: 'اختر فئة القطعة',
        subtitle: 'حدد التصنيف المناسب لهذه القطعة',
        showTitle: false,
    },
    {
        step: Step.Details,
        icon: 'card-text-outline',
        label: 'التفاصيل',
        title: 'تفاصيل القطعة',
        subtitle: 'أضف الاسم والسعر والوصف لإتمام النشر',
        showTitle: true,
    },
]

export const TOTAL_STEPS = STEPS.length

/** "2018" for a single year, "2015 - 2019" for a range, "" when unset. */
export const formatYearRange = (from: number | null, to: number | null): string => {
    if (from == null) return ''
    const hi = to ?? from
    return from === hi ? String(from) : `${from} - ${hi}`
}

export const ARABIC_TEXT = {
    STEP_OF: (current: number, total: number) => `${current} من ${total}`,
    YOUR_PART: 'قطعتك',
}
