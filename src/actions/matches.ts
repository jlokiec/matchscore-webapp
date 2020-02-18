import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as api from '../constants/api';
import { Match } from '../models/Match';
import { myAxios } from '../utils/axios';

export const FETCH_MATCHES_START = 'FETCH_MATCHES_START';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_ERROR = 'FETCH_MATCHES_ERROR';

export interface FetchMatchesStartAction {
    type: string
}

export interface FetchMatchesSuccessAction {
    type: string,
    matches: Array<Match>
}

export interface FetchMatchesErrorAction {
    type: string,
    error: object
}

export type MatchesAction = FetchMatchesStartAction | FetchMatchesSuccessAction | FetchMatchesErrorAction;

export const fetchMatchesStart = (): FetchMatchesStartAction => {
    return {
        type: FETCH_MATCHES_START
    };
}

export const fetchMatchesError = (error: object): FetchMatchesErrorAction => {
    return {
        type: FETCH_MATCHES_ERROR,
        error: error
    };
}

export const fetchMatchesSuccess = (matches: Array<Match>): FetchMatchesSuccessAction => {
    return {
        type: FETCH_MATCHES_SUCCESS,
        matches: matches
    };
}

export const fetchForLeague = (leagueId?: number): ThunkAction<Promise<void>, {}, {}, MatchesAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, MatchesAction>): Promise<void> => {
        dispatch(fetchMatchesStart());
        myAxios().get(api.MATCHES, {
            params: {
                league: leagueId
            }
        })
            .then(response => {
                dispatch(fetchMatchesSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchMatchesError(error));
                Promise.reject();
            });
    };
}

export const fetchForDate = (date: number): ThunkAction<Promise<void>, {}, {}, MatchesAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, MatchesAction>): Promise<void> => {
        dispatch(fetchMatchesStart());
        myAxios().get(api.MATCHES, {
            params: {
                date: date
            }
        })
            .then(response => {
                dispatch(fetchMatchesSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchMatchesError(error));
                Promise.reject();
            });
    }
}
