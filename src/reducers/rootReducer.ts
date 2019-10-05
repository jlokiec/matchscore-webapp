import { combineReducers } from 'redux';
import { user, UserState } from './userReducer';
import { leagues, LeaguesState } from './leaguesReducer';
import { categories, CategoriesState } from './categoriesReducer';

export interface CombinedState {
    user: UserState,
    leagues: LeaguesState,
    categories: CategoriesState
}

export const rootReducer = combineReducers<CombinedState>({ user, leagues, categories });
