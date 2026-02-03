import {useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {Text, TextInput, Button, useTheme, HelperText} from 'react-native-paper'

import {useAuthStore} from '@/global/store'
import {authService} from '../services'

import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    TITLE: 'تسجيل الدخول',
    EMAIL: 'البريد الإلكتروني',
    PASSWORD: 'كلمة المرور',
    LOGIN: 'دخول',
    NO_ACCOUNT: 'ليس لديك حساب؟',
    REGISTER: 'إنشاء حساب',
    ERROR: 'خطأ في البريد أو كلمة المرور',
    LOADING: 'جاري الدخول...',
}

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

interface LoginScreenProps {
    navigation: LoginScreenNavigationProp
}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
    const theme = useTheme()
    const login = useAuthStore(s => s.login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setError(null)
        if (!email.trim() || !password) {
            setError(ARABIC_TEXT.ERROR)
            return
        }
        setLoading(true)
        try {
            const {user, token} = await authService.login({email: email.trim(), password})
            login(user, token)
            navigation.replace('Main')
        } catch (err: unknown) {
            const msg = err && typeof err === 'object' && 'message' in err ? String((err as {message: string}).message) : ARABIC_TEXT.ERROR
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.content}>
                <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                    {ARABIC_TEXT.TITLE}
                </Text>

                <TextInput
                    label={ARABIC_TEXT.EMAIL}
                    value={email}
                    onChangeText={setEmail}
                    mode='outlined'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoComplete='email'
                    style={styles.input}
                    error={!!error}
                />
                <TextInput
                    label={ARABIC_TEXT.PASSWORD}
                    value={password}
                    onChangeText={setPassword}
                    mode='outlined'
                    secureTextEntry
                    autoComplete='password'
                    style={styles.input}
                    error={!!error}
                />

                {error ? (
                    <HelperText type='error' visible>
                        {error}
                    </HelperText>
                ) : null}

                <Button
                    mode='contained'
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}>
                    {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.LOGIN}
                </Button>

                <Button
                    mode='text'
                    onPress={() => navigation.navigate('Register')}
                    style={styles.linkButton}
                    labelStyle={{color: theme.colors.primary}}>
                    {ARABIC_TEXT.NO_ACCOUNT} {ARABIC_TEXT.REGISTER}
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: '700',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
        marginBottom: 8,
    },
    linkButton: {
        marginTop: 8,
    },
})
