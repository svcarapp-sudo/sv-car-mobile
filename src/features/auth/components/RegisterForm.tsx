import {useRef, useState} from 'react'
import {StyleSheet, View, type TextInput as RNTextInput} from 'react-native'
import {Button, HelperText, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    TITLE: 'إنشاء حساب',
    NAME: 'الاسم',
    EMAIL: 'البريد الإلكتروني',
    PASSWORD: 'كلمة المرور',
    PASSWORD_HINT: 'سته أحرف على الأقل',
    REGISTER: 'إنشاء الحساب',
    HAVE_ACCOUNT: 'لديك حساب بالفعل؟',
    LOGIN: 'تسجيل الدخول',
    LOADING: 'جاري الإنشاء...',
    SHOW_PASSWORD: 'إظهار كلمة المرور',
    HIDE_PASSWORD: 'إخفاء كلمة المرور',
}

interface RegisterFormProps {
    name: string
    onNameChange: (v: string) => void
    email: string
    onEmailChange: (v: string) => void
    password: string
    onPasswordChange: (v: string) => void
    error: string | null
    loading: boolean
    onRegister: () => void
    onGoToLogin: () => void
}

export const RegisterForm = ({
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    error,
    loading,
    onRegister,
    onGoToLogin,
}: RegisterFormProps) => {
    const theme = useAppTheme()
    const emailRef = useRef<RNTextInput>(null)
    const passwordRef = useRef<RNTextInput>(null)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.content}>
            <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.TITLE}
            </Text>
            <TextInput
                label={ARABIC_TEXT.NAME}
                value={name}
                onChangeText={onNameChange}
                mode='outlined'
                autoCapitalize='words'
                returnKeyType='next'
                submitBehavior='submit'
                onSubmitEditing={() => emailRef.current?.focus()}
                style={styles.input}
                error={!!error}
            />
            <TextInput
                ref={emailRef}
                label={ARABIC_TEXT.EMAIL}
                value={email}
                onChangeText={onEmailChange}
                mode='outlined'
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                returnKeyType='next'
                submitBehavior='submit'
                onSubmitEditing={() => passwordRef.current?.focus()}
                style={styles.input}
                error={!!error}
            />
            <TextInput
                ref={passwordRef}
                label={ARABIC_TEXT.PASSWORD}
                value={password}
                onChangeText={onPasswordChange}
                mode='outlined'
                secureTextEntry={!showPassword}
                autoComplete='password-new'
                returnKeyType='go'
                onSubmitEditing={() => !loading && onRegister()}
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(v => !v)}
                        accessibilityLabel={showPassword ? ARABIC_TEXT.HIDE_PASSWORD : ARABIC_TEXT.SHOW_PASSWORD}
                    />
                }
                style={styles.passwordInput}
                error={!!error}
            />
            {error ? (
                <HelperText type='error' visible>
                    {error}
                </HelperText>
            ) : (
                <HelperText type='info' visible>
                    {ARABIC_TEXT.PASSWORD_HINT}
                </HelperText>
            )}
            <Button mode='contained' onPress={onRegister} loading={loading} disabled={loading} style={styles.button}>
                {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.REGISTER}
            </Button>
            <Button mode='text' onPress={onGoToLogin} style={styles.linkButton} labelStyle={{color: theme.colors.primary}}>
                {ARABIC_TEXT.HAVE_ACCOUNT} {ARABIC_TEXT.LOGIN}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {paddingHorizontal: 24, paddingVertical: 16},
    title: {marginBottom: 24, textAlign: 'center', fontWeight: '700'},
    input: {marginBottom: 12},
    passwordInput: {marginBottom: 0},
    button: {marginTop: 16, marginBottom: 8},
    linkButton: {marginTop: 8},
})
