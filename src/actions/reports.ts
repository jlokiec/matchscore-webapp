import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as api from '../constants/api';
import { Report } from '../models/Report';
import { myAxios } from '../utils/axios';
import { AxiosError } from 'axios';

export const FETCH_REPORTS_START = 'FETCH_REPORTS_START';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';
export const FETCH_REPORT_START = 'FETCH_REPORT_START';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_ERROR = 'FETCH_REPORT_ERROR';
export const POST_REPORT_SUCCESS = 'POST_REPORT_SUCCESS';
export const POST_REPORT_ERROR = 'POST_REPORT_ERROR';

export interface FetchReportsStartAction {
    type: string
}

export interface FetchReportsSuccessAction {
    type: string,
    reports: Array<Report>
}

export interface FetchReportsErrorAction {
    type: string,
    error: AxiosError
}

export interface FetchReportStartAction {
    type: string
}

export interface FetchReportSuccessAction {
    type: string,
    report: Report
}

export interface FetchReportErrorAction {
    type: string,
    error: AxiosError
}

export interface PostReportSuccessAction {
    type: string,
    report: Report
}

export interface PostReportErrorAction {
    type: string,
    error: AxiosError
}

export type ReportsAction = FetchReportsStartAction | FetchReportsSuccessAction | FetchReportsErrorAction | FetchReportStartAction | FetchReportSuccessAction | FetchReportErrorAction | PostReportSuccessAction | PostReportErrorAction;

export const fetchReportsStart = (): ReportsAction => {
    return {
        type: FETCH_REPORTS_START
    };
}

export const fetchReportsError = (error: AxiosError): ReportsAction => {
    return {
        type: FETCH_REPORTS_ERROR,
        error: error
    };
}

export const fetchReportsSuccess = (reports: Array<Report>): ReportsAction => {
    return {
        type: FETCH_REPORTS_SUCCESS,
        reports: reports
    };
}

export const fetchReportStart = (): ReportsAction => {
    return {
        type: FETCH_REPORT_START
    };
}

export const fetchReportError = (error: AxiosError): ReportsAction => {
    return {
        type: FETCH_REPORT_ERROR,
        error: error
    };
}

export const fetchReportSuccess = (report: Report): ReportsAction => {
    return {
        type: FETCH_REPORT_SUCCESS,
        report: report
    };
}

export const postReportSuccess = (report: Report) => {
    return {
        type: POST_REPORT_SUCCESS,
        report: report
    }
}

export const postReportError = (error: AxiosError) => {
    return {
        type: POST_REPORT_ERROR,
        error: error
    };
}

export const fetchUnrated = (): ThunkAction<Promise<void>, {}, {}, ReportsAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, ReportsAction>): Promise<void> => {
        dispatch(fetchReportsStart());
        myAxios().get(api.UNRATED_REPORTS)
            .then(response => {
                dispatch(fetchReportsSuccess(response.data));
                Promise.resolve();
            })
            .catch((error: AxiosError) => {
                dispatch(fetchReportsError(error));
                Promise.reject();
            })
    };
}

export const fetchForMatchId = (matchId: number) => {
    return async (dispatch: ThunkDispatch<{}, {}, ReportsAction>): Promise<void> => {
        dispatch(fetchReportStart());
        myAxios().get(api.REPORTS, {
            params: {
                matchId: matchId
            }
        })
            .then(response => {
                dispatch(fetchReportSuccess(response.data));
                Promise.resolve();
            })
            .catch((error: AxiosError) => {
                dispatch(fetchReportError(error));
                Promise.reject();
            })
    };
}

export const createForMatchId = (matchId: number): ThunkAction<Promise<void>, {}, {}, ReportsAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, ReportsAction>): Promise<void> => {
        myAxios().post(api.REPORTS, null, {
            params: {
                matchId: matchId
            }
        })
            .then(response => {
                dispatch(postReportSuccess(response.data));
                Promise.resolve();
            })
            .catch((error: AxiosError) => {
                dispatch(postReportError(error));
                Promise.reject();
            })
    };
}
