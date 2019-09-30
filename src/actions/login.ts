import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios';
import { UserLoginDto } from '../models/UserLoginDto';
import * as api from '../constants/Api';
import { CredentialsDto } from '../models/CredentialsDto';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';

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

export type LoginAction = LoginStartAction | LoginSuccessAction | LoginErrorAction | LoginClearAction;

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

export const login = (credentials: CredentialsDto): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, LoginAction>): Promise<void> => {
        dispatch(loginStart());
        axios.post(api.LOGIN, credentials)
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

export const clear = () => {
    return {
        type: LOGIN_CLEAR
    };
}
