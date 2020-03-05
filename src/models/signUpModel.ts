export interface SignUpProps {
    isAuth: boolean;
    isRegister: boolean;
    onRegister: ({}) => object;
}

export interface SignUpState {
    nameText: string;
    emailText: string;
    passwordText: string;
    isValidName: boolean;
    isValidEmail: boolean;
    isValidPassword: boolean;
}