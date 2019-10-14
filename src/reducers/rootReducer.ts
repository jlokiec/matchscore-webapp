import { combineReducers } from 'redux';
import { user, UserState } from './userReducer';
import { leagues, LeaguesState } from './leaguesReducer';
import { categories, CategoriesState } from './categoriesReducer';
import { matches, MatchesState } from './matchReducer';

export interface CombinedState {
    user: UserState,
    leagues: LeaguesState,
    categories: CategoriesState,
    matches: MatchesState
}

export const rootReducer = combineReducers<CombinedState>({ user, leagues, categories, matches });
