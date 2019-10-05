import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import * as api from '../constants/Api';
import { League } from '../models/League';
import { myAxios } from '../utils/axios';

export const FETCH_LEAGUES_START = 'FETCH_LEAGUES_START';
export const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS';
export const FETCH_LEAGUES_ERROR = 'FETCH_LEAGUES_ERROR';

export interface FetchLeaguesStartAction {
    type: string
}

export interface FetchLeaguesSuccessAction {
    type: string,
    leagues: Array<League>
}

export interface FetchLeaguesErrorAction {
    type: string,
    error: object
}

export type LeaguesAction = FetchLeaguesStartAction | FetchLeaguesSuccessAction | FetchLeaguesErrorAction;

export const fetchLeaguesStart = (): FetchLeaguesStartAction => {
    return {
        type: FETCH_LEAGUES_START
    };
}

export const fetchLeaguesError = (error: object): FetchLeaguesErrorAction => {
    return {
        type: FETCH_LEAGUES_ERROR,
        error: error
    };
}

export const fetchLeaguesSuccess = (leagues: Array<League>): FetchLeaguesSuccessAction => {
    return {
        type: FETCH_LEAGUES_SUCCESS,
        leagues: leagues
    };
}

export const fetch = (categoryId: number): ThunkAction<Promise<void>, {}, {}, LeaguesAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, LeaguesAction>): Promise<void> => {
        dispatch(fetchLeaguesStart());
        myAxios().get(api.LEAGUES, {
            params: {
                category: categoryId
            }
        })
            .then(response => {
                dispatch(fetchLeaguesSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchLeaguesError(error));
                Promise.reject();
            });
    };
}
