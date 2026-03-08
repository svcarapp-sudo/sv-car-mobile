import {useTheme} from 'react-native-paper'
import type {AppTheme} from '@/global/theme'

export const useAppTheme = () => useTheme<AppTheme>()
