import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_CLEAR,
    LoginAction,
    LoginSuccessAction,
    LoginErrorAction
} from '../actions/login';

export interface LoginState {
    loading: boolean,
    error?: object,
    success: boolean,
    username: string,
    isAdmin: boolean,
    isUser: boolean,
    isGuest: boolean
}

const initialState = {
    loading: false,
    error: undefined,
    success: false,
    username: "Gość",
    isAdmin: false,
    isUser: false,
    isGuest: true
}

export const login = (state: LoginState = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                error: undefined,
                success: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                success: true,
                username: (action as LoginSuccessAction).user.username,
                isAdmin: (action as LoginSuccessAction).user.roles.includes('ROLE_ADMIN'),
                isUser: (action as LoginSuccessAction).user.roles.includes('ROLE_USER'),
                isGuest: false
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as LoginErrorAction).error,
                success: false,
                username: "Gość",
                isAdmin: false,
                isUser: false,
                isGuest: true
            };
        case LOGIN_CLEAR:
            return {
                ...state,
                loading: false,
                error: undefined,
                success: false
            };
        default:
            return state;
    }
}
