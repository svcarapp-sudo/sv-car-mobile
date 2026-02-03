import {Button as PaperButton, ButtonProps} from 'react-native-paper'

interface CustomButtonProps extends Omit<ButtonProps, 'mode'> {
    mode?: 'text' | 'outlined' | 'contained'
    variant?: 'primary' | 'secondary' | 'danger'
}

export const Button: React.FC<CustomButtonProps> = ({variant = 'primary', style, ...props}) => {
    const buttonStyle = variant === 'danger' ? {backgroundColor: undefined} : {}

    return <PaperButton mode={props.mode || 'contained'} style={[buttonStyle, style]} {...props} />
}
