import {useState} from 'react'
import {StyleSheet} from 'react-native'

import {Screen} from '@/global/components'
import {useAppTheme} from '@/global/hooks'
import {useAuthStore} from '@/global/store'
import {authService} from '../services'
import {RegisterForm} from './RegisterForm'

import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC = {
    PASSWORD_HINT: 'كلمة المرور (6 أحرف على الأقل)',
    ERROR: 'يرجى تعبئة جميع الحقول بشكل صحيح',
    EMAIL_IN_USE: 'البريد الإلكتروني مستخدم مسبقاً',
}

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

interface RegisterScreenProps {
    navigation: RegisterScreenNavigationProp
}

export const RegisterScreen = ({navigation}: RegisterScreenProps) => {
    const theme = useAppTheme()
    const login = useAuthStore(s => s.login)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async () => {
        setError(null)
        if (!name.trim() || !email.trim() || !password) {
            setError(ARABIC.ERROR)
            return
        }
        if (password.length < 6) {
            setError(ARABIC.PASSWORD_HINT)
            return
        }
        setLoading(true)
        try {
            const {user, token} = await authService.register({name: name.trim(), email: email.trim(), password})
            login(user, token)
            navigation.replace('Main')
        } catch (err: unknown) {
            const status = err && typeof err === 'object' && 'status' in err ? (err as {status: number}).status : 0
            const msg =
                status === 409
                    ? ARABIC.EMAIL_IN_USE
                    : err && typeof err === 'object' && 'message' in err
                      ? String((err as {message: string}).message)
                      : ARABIC.ERROR
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Screen
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            contentContainerStyle={styles.scrollContent}>
            <RegisterForm
                name={name}
                onNameChange={setName}
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
                error={error}
                loading={loading}
                onRegister={handleRegister}
                onGoToLogin={() => navigation.navigate('Login')}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    scrollContent: {flexGrow: 1, justifyContent: 'center', paddingVertical: 24},
})
