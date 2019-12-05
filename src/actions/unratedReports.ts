import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as api from '../constants/api';
import { UnratedReport } from '../models/UnratedReport';
import { myAxios } from '../utils/axios';

export const FETCH_UNRATED_REPORTS_START = 'FETCH_UNRATED_REPORTS_START';
export const FETCH_UNRATED_REPORTS_SUCCESS = 'FETCH_UNRATED_REPORTS_SUCCESS';
export const FETCH_UNRATED_REPORTS_ERROR = 'FETCH_UNRATED_REPORTS_ERROR';

export interface FetchUnratedReportsStartAction {
    type: string
}

export interface FetchUnratedReportsSuccessAction {
    type: string,
    reports: Array<UnratedReport>
}

export interface FetchUnratedReportsErrorAction {
    type: string,
    error: object
}

export type UnratedReportsAction = FetchUnratedReportsStartAction | FetchUnratedReportsSuccessAction | FetchUnratedReportsErrorAction;

export const fetchUnratedReportsStart = (): UnratedReportsAction => {
    return {
        type: FETCH_UNRATED_REPORTS_START
    };
}

export const fetchUnratedReportsError = (error: object): UnratedReportsAction => {
    return {
        type: FETCH_UNRATED_REPORTS_ERROR,
        error: error
    };
}

export const fetchUnratedReportsSuccess = (categories: Array<UnratedReport>): UnratedReportsAction => {
    return {
        type: FETCH_UNRATED_REPORTS_SUCCESS,
        reports: categories
    };
}

export const fetch = (): ThunkAction<Promise<void>, {}, {}, UnratedReportsAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, UnratedReportsAction>): Promise<void> => {
        dispatch(fetchUnratedReportsStart());
        myAxios().get(api.UNRATED_REPORTS)
            .then(response => {
                dispatch(fetchUnratedReportsSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchUnratedReportsError(error));
                Promise.reject();
            })
    };
}
