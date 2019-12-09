import { combineReducers } from 'redux';
import { user, UserState } from './userReducer';
import { leagues, LeaguesState } from './leaguesReducer';
import { categories, CategoriesState } from './categoriesReducer';
import { matches, MatchesState } from './matchReducer';
import { reports, ReportsState } from './reportsReducer';
import { matchEvents, MatchEventsState } from './matchEventsReducer';
import { players, PlayersState } from './playersReducer';

export interface CombinedState {
    user: UserState,
    leagues: LeaguesState,
    categories: CategoriesState,
    matches: MatchesState,
    reports: ReportsState,
    matchEvents: MatchEventsState,
    players: PlayersState
}

export const rootReducer = combineReducers<CombinedState>({ user, leagues, categories, matches, reports, matchEvents, players });
