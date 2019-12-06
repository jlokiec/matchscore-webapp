import {
    FETCH_UNRATED_REPORTS_START,
    FETCH_UNRATED_REPORTS_SUCCESS,
    FETCH_UNRATED_REPORTS_ERROR,
    UnratedReportsAction,
    FetchUnratedReportsSuccessAction,
    FetchUnratedReportsErrorAction
} from '../actions/unratedReports';
import { UnratedReport } from '../models/UnratedReport';

export interface UnratedReportsState {
    loading: boolean,
    error?: object,
    data: Array<UnratedReport>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const unratedReports = (state: UnratedReportsState = initialState, action: UnratedReportsAction) => {
    switch (action.type) {
        case FETCH_UNRATED_REPORTS_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_UNRATED_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: (action as FetchUnratedReportsSuccessAction).reports
            };
        case FETCH_UNRATED_REPORTS_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchUnratedReportsErrorAction).error
            };
        default:
            return state;
    }
}
