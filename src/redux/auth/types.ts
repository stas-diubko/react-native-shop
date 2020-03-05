export enum LoginActions {
    ON_LOGIN = 'ON_LOGIN',
    ON_LOGOUT = 'ON_LOGOUT',
    ON_REGISTER = 'ON_REGISTER',
    OFF_REGISTER = 'OFF_REGISTER'
}

export interface LoginState {
    isAuth: boolean;
    isRegister: boolean;
}