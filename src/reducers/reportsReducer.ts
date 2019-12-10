import {
    FETCH_REPORTS_START,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_ERROR,
    POST_REPORT_SUCCESS,
    POST_REPORT_ERROR,
    ReportsAction,
    FetchReportsSuccessAction,
    FetchReportsErrorAction,
    PostReportErrorAction,
    PostReportSuccessAction,
    FETCH_REPORT_START,
    FETCH_REPORT_SUCCESS,
    FETCH_REPORT_ERROR,
    FetchReportSuccessAction,
    FetchReportErrorAction,
    UPDATE_SUCCESS,
    UpdateSuccessAction,
    UPDATE_ERROR,
    UpdateErrorAction,
    RATE_REPORT_SUCCESS,
    RATE_REPORT_ERROR,
    RateReportSuccessAction,
    RateReportErrorAction
} from '../actions/reports';
import { Report } from '../models/Report';
import { AxiosError } from 'axios';
import { ReportRating } from '../models/ReportRating';

export interface ReportsState {
    loading: boolean,
    error?: AxiosError,
    data: Array<Report>,
    shouldPostReport: boolean
}

const initialState = {
    loading: false,
    error: undefined,
    data: [],
    shouldPostReport: false
}

export const reports = (state: ReportsState = initialState, action: ReportsAction) => {
    switch (action.type) {
        case FETCH_REPORTS_START:
            return {
                ...state,
                loading: true,
                error: undefined,
                shouldPostReport: false
            };
        case FETCH_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: [...state.data, ...((action as FetchReportsSuccessAction).reports)],
                shouldPostReport: false
            };
        case FETCH_REPORTS_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchReportsErrorAction).error,
                shouldPostReport: false
            };
        case FETCH_REPORT_START:
            return {
                ...state,
                loading: true,
                error: undefined,
                shouldPostReport: false
            };
        case FETCH_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: [...state.data, (action as FetchReportSuccessAction).report],
                shouldPostReport: false
            };
        case FETCH_REPORT_ERROR:
            const error = (action as FetchReportErrorAction).error;
            const shouldPostReport = error.message === 'Request failed with status code 404' ? true : false;
            return {
                ...state,
                loading: false,
                error: error,
                shouldPostReport: shouldPostReport
            };
        case POST_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: [...state.data, (action as PostReportSuccessAction).report],
                shouldPostReport: false
            };
        case POST_REPORT_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as PostReportErrorAction).error,
                shouldPostReport: false
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                error: undefined,
                data: mergeUpdatedReport(state, (action as UpdateSuccessAction).report)
            };
        case UPDATE_ERROR:
            return {
                ...state,
                error: (action as UpdateErrorAction).error
            };
        case RATE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergeRatingWithReport(state, (action as RateReportSuccessAction).rating)
            };
        case RATE_REPORT_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as RateReportErrorAction).error
            };
        default:
            return state;
    }
}

export const getUnrated = (state: ReportsState) => {
    return state.data.filter(report => report.rating === null);
}

export const getForMatchId = (state: ReportsState, matchId: number) => {
    return state.data.find(report => report.match.id === matchId);
}

const mergeUpdatedReport = (state: ReportsState, updatedReport: Report) => {
    const index = state.data.findIndex(report => report.id === updatedReport.id);

    if (index !== -1) {
        state.data[index] = updatedReport;
    }

    return state.data;
}

const mergeRatingWithReport = (state: ReportsState, reportRating: ReportRating) => {
    const reportId = reportRating.reportId;
    const index = state.data.findIndex(report => report.id === reportId);

    if (index !== -1) {
        state.data[index].rating = reportRating;
    }

    return state.data;
}
