import { combineReducers } from 'redux';
import { login, LoginState } from './loginReducer';
import { leagues, LeaguesState } from './leaguesReducer';
import { categories, CategoriesState } from './categoriesReducer';

export interface CombinedState {
    login: LoginState,
    leagues: LeaguesState,
    categories: CategoriesState
}

export const rootReducer = combineReducers<CombinedState>({ login, leagues, categories });
