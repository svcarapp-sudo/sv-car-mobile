// Part Categories
import type {PartCategoryInfo, PartCategory} from '@/shared/types'

export const APP_NAME = 'SV Car Mobile'

export const API_BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.example.com'

const ARABIC_CATEGORIES = {
    ENGINE: 'المحرك',
    ENGINE_DESC: 'مكونات وأجزاء المحرك',
    SUSPENSION: 'نظام التعليق',
    SUSPENSION_DESC: 'أنظمة ومكونات نظام التعليق',
    BRAKES: 'الفرامل',
    BRAKES_DESC: 'فحمات، ديسكات، وأنظمة الفرامل',
    ELECTRICAL: 'الكهرباء',
    ELECTRICAL_DESC: 'المكونات الكهربائية والأسلاك',
    BODY: 'الهيكل',
    BODY_DESC: 'ألواح الهيكل والأجزاء الخارجية',
    INTERIOR: 'المقصورة الداخلية',
    INTERIOR_DESC: 'المكونات الداخلية والترميم',
    EXHAUST: 'العادم',
    EXHAUST_DESC: 'أنظمة العادم والمواسير',
    COOLING: 'التبريد',
    COOLING_DESC: 'الرديترات، الخراطيم، وأنظمة التبريد',
    TRANSMISSION: 'ناقل الحركة',
    TRANSMISSION_DESC: 'مكونات ناقل الحركة',
    FUEL: 'نظام الوقود',
    FUEL_DESC: 'مضخات، فلاتر، وبخاخات الوقود',
    TIRES: 'الإطارات والجنوط',
    TIRES_DESC: 'الإطارات، الجنوط، والمكونات ذات الصلة',
    OTHER: 'أخرى',
    OTHER_DESC: 'قطع غيار متنوعة',
}

export const PART_CATEGORIES: Record<PartCategory, PartCategoryInfo> = {
    engine: {
        id: 'engine',
        name: ARABIC_CATEGORIES.ENGINE,
        icon: 'engine-outline',
        description: ARABIC_CATEGORIES.ENGINE_DESC,
    },
    suspension: {
        id: 'suspension',
        name: ARABIC_CATEGORIES.SUSPENSION,
        icon: 'cog-outline',
        description: ARABIC_CATEGORIES.SUSPENSION_DESC,
    },
    brakes: {
        id: 'brakes',
        name: ARABIC_CATEGORIES.BRAKES,
        icon: 'car-brake-alert',
        description: ARABIC_CATEGORIES.BRAKES_DESC,
    },
    electrical: {
        id: 'electrical',
        name: ARABIC_CATEGORIES.ELECTRICAL,
        icon: 'lightning-bolt',
        description: ARABIC_CATEGORIES.ELECTRICAL_DESC,
    },
    body: {
        id: 'body',
        name: ARABIC_CATEGORIES.BODY,
        icon: 'car-door',
        description: ARABIC_CATEGORIES.BODY_DESC,
    },
    interior: {
        id: 'interior',
        name: ARABIC_CATEGORIES.INTERIOR,
        icon: 'car-seat',
        description: ARABIC_CATEGORIES.INTERIOR_DESC,
    },
    exhaust: {
        id: 'exhaust',
        name: ARABIC_CATEGORIES.EXHAUST,
        icon: 'pipe',
        description: ARABIC_CATEGORIES.EXHAUST_DESC,
    },
    cooling: {
        id: 'cooling',
        name: ARABIC_CATEGORIES.COOLING,
        icon: 'water',
        description: ARABIC_CATEGORIES.COOLING_DESC,
    },
    transmission: {
        id: 'transmission',
        name: ARABIC_CATEGORIES.TRANSMISSION,
        icon: 'car-shift-pattern',
        description: ARABIC_CATEGORIES.TRANSMISSION_DESC,
    },
    fuel: {
        id: 'fuel',
        name: ARABIC_CATEGORIES.FUEL,
        icon: 'fuel',
        description: ARABIC_CATEGORIES.FUEL_DESC,
    },
    tires: {
        id: 'tires',
        name: ARABIC_CATEGORIES.TIRES,
        icon: 'circle-outline',
        description: ARABIC_CATEGORIES.TIRES_DESC,
    },
    other: {
        id: 'other',
        name: ARABIC_CATEGORIES.OTHER,
        icon: 'toolbox',
        description: ARABIC_CATEGORIES.OTHER_DESC,
    },
}

export const PART_CATEGORIES_LIST = Object.values(PART_CATEGORIES)
