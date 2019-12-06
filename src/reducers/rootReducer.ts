import { combineReducers } from 'redux';
import { user, UserState } from './userReducer';
import { leagues, LeaguesState } from './leaguesReducer';
import { categories, CategoriesState } from './categoriesReducer';
import { matches, MatchesState } from './matchReducer';
import { unratedReports, UnratedReportsState } from './unratedReportsReducer';

export interface CombinedState {
    user: UserState,
    leagues: LeaguesState,
    categories: CategoriesState,
    matches: MatchesState,
    unratedReports: UnratedReportsState
}

export const rootReducer = combineReducers<CombinedState>({ user, leagues, categories, matches, unratedReports });
