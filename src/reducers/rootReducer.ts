import { combineReducers } from 'redux';
import { login, LoginState } from './loginReducer';
import { leagues, LeaguesState } from './leaguesReducer';

export interface CombinedState {
    login: LoginState,
    leagues: LeaguesState
}

export const rootReducer = combineReducers<CombinedState>({ login, leagues });
