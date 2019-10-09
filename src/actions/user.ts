import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { UserLoginDto } from '../models/UserLoginDto';
import * as api from '../constants/api';
import { CredentialsDto } from '../models/CredentialsDto';
import { myAxios } from '../utils/axios';
import { removeToken } from '../utils/token';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';
export const LOGOUT = 'LOGOUT';

export interface LoginStartAction {
    type: string
}

export interface LoginSuccessAction {
    type: string,
    user: UserLoginDto
}

export interface LoginErrorAction {
    type: string,
    error: object
}

export interface LoginClearAction {
    type: string
}

export interface LogoutAction {
    type: string
}

export type UserAction = LoginStartAction | LoginSuccessAction | LoginErrorAction | LoginClearAction | LogoutAction;

export const loginStart = (): LoginStartAction => {
    return {
        type: LOGIN_START
    };
}

export const loginError = (error: object): LoginErrorAction => {
    return {
        type: LOGIN_ERROR,
        error: error
    };
}

export const loginSuccess = (dto: UserLoginDto): LoginSuccessAction => {
    return {
        type: LOGIN_SUCCESS,
        user: dto
    };
}

export const clear = () => {
    return {
        type: LOGIN_CLEAR
    };
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT
    };
}

export const login = (credentials: CredentialsDto): ThunkAction<Promise<void>, {}, {}, UserAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, UserAction>): Promise<void> => {
        dispatch(loginStart());
        myAxios().post(api.LOGIN, credentials)
            .then(response => {
                dispatch(loginSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(loginError(error));
                Promise.reject();
            });
    };
}

export const logout = (): UserAction => {
    removeToken();
    return logoutSuccess();
}
