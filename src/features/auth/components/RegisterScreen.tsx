import {useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {Text, TextInput, Button, useTheme, HelperText} from 'react-native-paper'

import {useAuthStore} from '@/global/store'
import {authService} from '../services'

import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {RootStackParamList} from '@/global/navigation/types'

const ARABIC_TEXT = {
    TITLE: 'إنشاء حساب',
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    PASSWORD: 'كلمة المرور (6 أحرف على الأقل)',
    REGISTER: 'إنشاء الحساب',
    HAVE_ACCOUNT: 'لديك حساب بالفعل؟',
    LOGIN: 'تسجيل الدخول',
    ERROR: 'يرجى تعبئة جميع الحقول بشكل صحيح',
    EMAIL_IN_USE: 'البريد الإلكتروني مستخدم مسبقاً',
    LOADING: 'جاري الإنشاء...',
}

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

interface RegisterScreenProps {
    navigation: RegisterScreenNavigationProp
}

export const RegisterScreen = ({navigation}: RegisterScreenProps) => {
    const theme = useTheme()
    const login = useAuthStore(s => s.login)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async () => {
        setError(null)
        if (!name.trim() || !email.trim() || !password) {
            setError(ARABIC_TEXT.ERROR)
            return
        }
        if (password.length < 6) {
            setError(ARABIC_TEXT.PASSWORD)
            return
        }
        setLoading(true)
        try {
            const {user, token} = await authService.register({
                name: name.trim(),
                email: email.trim(),
                password,
            })
            login(user, token)
            navigation.replace('Main')
        } catch (err: unknown) {
            const status = err && typeof err === 'object' && 'status' in err ? (err as {status: number}).status : 0
            const msg =
                status === 409 ? ARABIC_TEXT.EMAIL_IN_USE : err && typeof err === 'object' && 'message' in err ? String((err as {message: string}).message) : ARABIC_TEXT.ERROR
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={[styles.container, {backgroundColor: theme.colors.background}]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps='handled'>
                <View style={styles.content}>
                    <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                        {ARABIC_TEXT.TITLE}
                    </Text>

                    <TextInput
                        label={ARABIC_TEXT.NAME}
                        value={name}
                        onChangeText={setName}
                        mode='outlined'
                        autoCapitalize='words'
                        style={styles.input}
                        error={!!error}
                    />
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
                        autoComplete='password-new'
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
                        onPress={handleRegister}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}>
                        {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.REGISTER}
                    </Button>

                    <Button
                        mode='text'
                        onPress={() => navigation.navigate('Login')}
                        style={styles.linkButton}
                        labelStyle={{color: theme.colors.primary}}>
                        {ARABIC_TEXT.HAVE_ACCOUNT} {ARABIC_TEXT.LOGIN}
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 24,
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
