export interface OnboardingSlideData {
    id: string
    illustration: 'welcome' | 'browse' | 'sell'
    title: string
    description: string
}

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
    {
        id: 'welcome',
        illustration: 'welcome',
        title: 'مرحبًا بك في SV Car',
        description: 'وجهتك الأولى لقطع غيار السيارات\nاعثر على القطعة المناسبة لسيارتك بثوانٍ',
    },
    {
        id: 'browse',
        illustration: 'browse',
        title: 'آلاف القطع بين يديك',
        description: 'تصفّح واختر من بين آلاف القطع المتوافقة\nمع مركبتك — نتائج دقيقة وموثوقة',
    },
    {
        id: 'sell',
        illustration: 'sell',
        title: 'بِع قطعك واربح',
        description: 'أضف قطع الغيار واوصل لآلاف المشترين\nحوّل قطعك الزائدة إلى أرباح حقيقية',
    },
]
