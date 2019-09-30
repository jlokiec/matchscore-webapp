import { combineReducers } from 'redux';
import { login, LoginState } from './loginReducer';

export interface CombinedState {
    login: LoginState
}

export const rootReducer = combineReducers<CombinedState>({ login });
