import { LoginState } from "./types";
import { RootState} from '../root.reducer'

export const initialState: LoginState = {
    isAuth: false,
    isRegister: false
}

export function authReducer(state: LoginState = initialState, action: any) {
    switch (action.type) {
        case 'ON_LOGIN': {
            return {
                ...state,
                isAuth: true,
                isRegister: false
            }
        }
        case 'ON_REGISTER': {
            return {
                ...state,
                isRegister: action.data
            }
        }
        case 'OFF_REGISTER': {
            return {
                ...state,
                isRegister: false
            }
        }
        case 'ON_LOGOUT': {
            return {
                ...state,
                isRegister: false,
                isAuth: false
            }
        }
        default:
            return state;
    }
}

// export const home = (state: RootState) => state.home;