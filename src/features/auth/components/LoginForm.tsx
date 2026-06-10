import {useRef, useState} from 'react'
import {StyleSheet, View, type TextInput as RNTextInput} from 'react-native'
import {Button, HelperText, Text, TextInput} from 'react-native-paper'

import {useAppTheme} from '@/global/hooks'

const ARABIC_TEXT = {
    TITLE: 'تسجيل الدخول',
    EMAIL: 'البريد الإلكتروني',
    PASSWORD: 'كلمة المرور',
    LOGIN: 'دخول',
    NO_ACCOUNT: 'ليس لديك حساب؟',
    REGISTER: 'إنشاء حساب',
    LOADING: 'جاري الدخول...',
    FILL_TEST_CREDENTIALS: 'ملء بيانات الاختبار',
    SHOW_PASSWORD: 'إظهار كلمة المرور',
    HIDE_PASSWORD: 'إخفاء كلمة المرور',
}

interface LoginFormProps {
    email: string
    onEmailChange: (v: string) => void
    password: string
    onPasswordChange: (v: string) => void
    error: string | null
    loading: boolean
    onLogin: () => void
    onFillTestCredentials: () => void
    onGoToRegister: () => void
}

export const LoginForm = ({
    email,
    onEmailChange,
    password,
    onPasswordChange,
    error,
    loading,
    onLogin,
    onFillTestCredentials,
    onGoToRegister,
}: LoginFormProps) => {
    const theme = useAppTheme()
    const passwordRef = useRef<RNTextInput>(null)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.content}>
            <Text variant='headlineMedium' style={[styles.title, {color: theme.colors.onSurface}]}>
                {ARABIC_TEXT.TITLE}
            </Text>
            <TextInput
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
                autoComplete='password'
                returnKeyType='go'
                onSubmitEditing={() => !loading && onLogin()}
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(v => !v)}
                        accessibilityLabel={showPassword ? ARABIC_TEXT.HIDE_PASSWORD : ARABIC_TEXT.SHOW_PASSWORD}
                    />
                }
                style={styles.input}
                error={!!error}
            />
            {error ? (
                <HelperText type='error' visible>
                    {error}
                </HelperText>
            ) : null}
            {__DEV__ && (
                <Button
                    mode='outlined'
                    onPress={onFillTestCredentials}
                    disabled={loading}
                    style={styles.testButton}
                    labelStyle={styles.testLabel}>
                    {ARABIC_TEXT.FILL_TEST_CREDENTIALS}
                </Button>
            )}
            <Button mode='contained' onPress={onLogin} loading={loading} disabled={loading} style={styles.button}>
                {loading ? ARABIC_TEXT.LOADING : ARABIC_TEXT.LOGIN}
            </Button>
            <Button mode='text' onPress={onGoToRegister} style={styles.linkButton} labelStyle={{color: theme.colors.primary}}>
                {ARABIC_TEXT.NO_ACCOUNT} {ARABIC_TEXT.REGISTER}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {paddingHorizontal: 24, paddingVertical: 16},
    title: {marginBottom: 24, textAlign: 'center', fontWeight: '700'},
    input: {marginBottom: 12},
    testButton: {marginTop: 8, marginBottom: 4},
    testLabel: {fontSize: 12},
    button: {marginTop: 16, marginBottom: 8},
    linkButton: {marginTop: 8},
})
