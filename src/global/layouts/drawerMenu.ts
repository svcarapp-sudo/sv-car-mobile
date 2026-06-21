/** Drawer destinations — every entry maps to a real screen in the Main stack. */
export type DrawerScreen =
    | 'Home'
    | 'PartsCategories'
    | 'SavedParts'
    | 'MyAccount'
    | 'MyParts'
    | 'MyPartRequests'
    | 'PartRequestsList'
    | 'SellerAccount'

export interface DrawerMenuItem {
    id: string
    label: string
    icon: string
    screen: DrawerScreen
}

export const DRAWER_TEXT = {
    MAIN_MENU: 'القائمة الرئيسية',
    ACCOUNT: 'الحساب',
    LOGOUT: 'تسجيل الخروج',
    USER_NAME: 'مستخدم SV',
    USER_STATUS: 'عضو مميز',
    OPEN_PROFILE: 'فتح الملف الشخصي',
}

export const DRAWER_MAIN_ITEMS: DrawerMenuItem[] = [
    {id: 'home', label: 'الرئيسية', icon: 'home-outline', screen: 'Home'},
    {id: 'categories', label: 'تصفح الفئات', icon: 'view-grid-outline', screen: 'PartsCategories'},
    {id: 'favorites', label: 'المفضلة', icon: 'heart-outline', screen: 'SavedParts'},
]

export const DRAWER_ACCOUNT_ITEMS: DrawerMenuItem[] = [
    {id: 'account', label: 'حسابي', icon: 'account-outline', screen: 'MyAccount'},
    {id: 'my-parts', label: 'إعلاناتي', icon: 'package-variant', screen: 'MyParts'},
    {id: 'my-requests', label: 'طلباتي', icon: 'clipboard-list-outline', screen: 'MyPartRequests'},
    {id: 'browse-requests', label: 'تصفّح كل الطلبات', icon: 'clipboard-search-outline', screen: 'PartRequestsList'},
    {id: 'seller', label: 'لوحة البائع', icon: 'storefront-outline', screen: 'SellerAccount'},
]
