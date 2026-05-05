import {useState} from 'react'
import {StyleSheet} from 'react-native'

import {Screen} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import {authService} from '../services'
import {LoginForm} from './LoginForm'

import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_ERROR = 'خطأ في البريد أو كلمة المرور'
const TEST_CREDENTIALS = {email: 'mohammad@gmail.com', password: 'Mohammad@1234'}

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

interface LoginScreenProps {
    navigation: LoginScreenNavigationProp
}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
    const theme = useAppTheme()
    const login = useAuthStore(s => s.login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFillTestCredentials = () => {
        setEmail(TEST_CREDENTIALS.email)
        setPassword(TEST_CREDENTIALS.password)
        setError(null)
    }

    const handleLogin = async () => {
        setError(null)
        if (!email.trim() || !password) {
            setError(ARABIC_ERROR)
            return
        }
        setLoading(true)
        try {
            const {user, token} = await authService.login({email: email.trim(), password})
            login(user, token)
            navigation.replace('Main')
        } catch (err: unknown) {
            const msg =
                err && typeof err === 'object' && 'message' in err ? String((err as {message: string}).message) : ARABIC_ERROR
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Screen
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.scrollContent}>
            <LoginForm
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
                error={error}
                loading={loading}
                onLogin={handleLogin}
                onFillTestCredentials={handleFillTestCredentials}
                onGoToRegister={() => navigation.navigate('Register')}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    scrollContent: {flexGrow: 1, justifyContent: 'center'},
})
