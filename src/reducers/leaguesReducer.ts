import {
    FETCH_LEAGUES_START,
    FETCH_LEAGUES_SUCCESS,
    FETCH_LEAGUES_ERROR,
    LeaguesAction,
    FetchLeaguesSuccessAction,
    FetchLeaguesErrorAction
} from '../actions/leagues';
import { League } from '../models/League';

export interface LeaguesState {
    loading: boolean,
    error?: object,
    data: Array<League>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const leagues = (state: LeaguesState = initialState, action: LeaguesAction): LeaguesState => {
    switch (action.type) {
        case FETCH_LEAGUES_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_LEAGUES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergeLeagueArrays(state.data, (action as FetchLeaguesSuccessAction).leagues)
            };
        case FETCH_LEAGUES_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchLeaguesErrorAction).error
            };
        default:
            return state;
    }
}

const mergeLeagueArrays = (oldState: Array<League>, fetchedLeagues: Array<League>) => {
    return [...oldState, ...fetchedLeagues].reduce((res: Array<League>, data: League, index: number, arr: Array<League>) => {
        if (res.findIndex(league => league.id === data.id) < 0) {
            res.push(data);
        }
        return res;
    }, []);
}

export const getLeaguesForCategoryId = (state: LeaguesState, categoryId: number) => {
    return state.data.filter(league => league.categoryId === categoryId);
}
