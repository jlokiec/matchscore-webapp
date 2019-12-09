import {
    FETCH_MATCH_EVENT_START,
    FETCH_MATCH_EVENT_SUCCESS,
    FETCH_MATCH_EVENT_ERROR,
    POST_MATCH_EVENT_SUCCESS,
    POST_MATCH_EVENT_ERROR,
    FetchMatchEventsSuccessAction,
    FetchMatchEventsErrorAction,
    PostMatchEventSuccessAction,
    PostMatchEventErrorAction,
    MatchEventsAction
} from '../actions/matchEvents';
import { MatchEvent } from '../models/MatchEvent';

export interface MatchEventsState {
    loading: boolean,
    error?: object,
    data: Array<MatchEvent>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const matchEvents = (state: MatchEventsState = initialState, action: MatchEventsAction) => {
    switch (action.type) {
        case FETCH_MATCH_EVENT_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_MATCH_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergeMatchEventsArrays(state.data, (action as FetchMatchEventsSuccessAction).matchEvents)
            };
        case FETCH_MATCH_EVENT_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchMatchEventsErrorAction).error
            };
        case POST_MATCH_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergeMatchEventsArrays(state.data, [(action as PostMatchEventSuccessAction).matchEvent])
            };
        case POST_MATCH_EVENT_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as PostMatchEventErrorAction).error
            };
        default:
            return state;
    }
}

const mergeMatchEventsArrays = (oldState: Array<MatchEvent>, fetchedEvents: Array<MatchEvent>) => {
    return [...oldState, ...fetchedEvents].reduce((res: Array<MatchEvent>, data: MatchEvent, index: number, arr: Array<MatchEvent>) => {
        if (res.findIndex(event => event.id === data.id) < 0) {
            res.push(data);
        }
        return res;
    }, []);
}

export const getEventsForReport = (state: MatchEventsState, reportId: number) => {
    const filteredEvents = state.data.filter(event => event.reportId === reportId);
    return filteredEvents.sort((e1, e2) => e1.timestamp - e2.timestamp);
}
