import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as api from '../constants/api';
import { MatchEvent } from '../models/MatchEvent';
import { CreateMatchEventDto } from '../models/CreateMatchEventDto';
import { myAxios } from '../utils/axios';

export const FETCH_MATCH_EVENT_START = 'FETCH_MATCH_EVENT_START';
export const FETCH_MATCH_EVENT_SUCCESS = 'FETCH_MATCH_EVENT_SUCCESS';
export const FETCH_MATCH_EVENT_ERROR = 'FETCH_MATCH_EVENT_ERROR';
export const POST_MATCH_EVENT_SUCCESS = 'POST_MATCH_EVENT_SUCCESS';
export const POST_MATCH_EVENT_ERROR = 'POST_MATCH_EVENT_ERROR';

export interface FetchMatchEventsStartAction {
    type: string
}

export interface FetchMatchEventsSuccessAction {
    type: string,
    matchEvents: Array<MatchEvent>
}

export interface FetchMatchEventsErrorAction {
    type: string,
    error: object
}

export interface PostMatchEventSuccessAction {
    type: string,
    matchEvent: MatchEvent
}

export interface PostMatchEventErrorAction {
    type: string,
    error: object
}

export type MatchEventsAction = FetchMatchEventsStartAction | FetchMatchEventsSuccessAction | FetchMatchEventsErrorAction | PostMatchEventSuccessAction | PostMatchEventErrorAction;

export const fetchMatchEventsStart = (): FetchMatchEventsStartAction => {
    return {
        type: FETCH_MATCH_EVENT_START
    };
}

export const fetchMatchEventsError = (error: object): FetchMatchEventsErrorAction => {
    return {
        type: FETCH_MATCH_EVENT_ERROR,
        error: error
    };
}

export const fetchMatchEventsSuccess = (matchEvents: Array<MatchEvent>): FetchMatchEventsSuccessAction => {
    return {
        type: FETCH_MATCH_EVENT_SUCCESS,
        matchEvents: matchEvents
    };
}

export const postMatchEventSuccess = (matchEvent: MatchEvent): PostMatchEventSuccessAction => {
    return {
        type: POST_MATCH_EVENT_SUCCESS,
        matchEvent: matchEvent
    };
}

export const postMatchEventError = (error: object): PostMatchEventErrorAction => {
    return {
        type: POST_MATCH_EVENT_ERROR,
        error: error
    };
}

export const postMatchEvent = (data: CreateMatchEventDto): ThunkAction<Promise<void>, {}, {}, MatchEventsAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, MatchEventsAction>): Promise<void> => {
        myAxios().post(api.MATCH_EVENTS, data)
            .then(response => {
                dispatch(postMatchEventSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(postMatchEventError(error));
                Promise.reject();
            });
    };
}

export const fetchForReport = (reportId: number): ThunkAction<Promise<void>, {}, {}, MatchEventsAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, MatchEventsAction>): Promise<void> => {
        dispatch(fetchMatchEventsStart());
        myAxios().get(api.MATCH_EVENTS, {
            params: {
                reportId: reportId
            }
        })
            .then(response => {
                dispatch(fetchMatchEventsSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchMatchEventsError(error));
                Promise.reject();
            });
    };
}
