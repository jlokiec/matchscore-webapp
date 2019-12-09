import {
    FETCH_MATCHES_START,
    FETCH_MATCHES_SUCCESS,
    FETCH_MATCHES_ERROR,
    MatchesAction,
    FetchMatchesErrorAction,
    FetchMatchesSuccessAction,
} from '../actions/matches';
import { Match } from '../models/Match';

export interface MatchesState {
    loading: boolean,
    error?: object,
    data: Array<Match>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const matches = (state: MatchesState = initialState, action: MatchesAction): MatchesState => {
    switch (action.type) {
        case FETCH_MATCHES_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_MATCHES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergeMatchArrays(state.data, (action as FetchMatchesSuccessAction).matches)
            };
        case FETCH_MATCHES_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchMatchesErrorAction).error
            };
        default:
            return state;
    }
}

const mergeMatchArrays = (oldState: Array<Match>, fetchedLeagues: Array<Match>) => {
    return [...oldState, ...fetchedLeagues].reduce((res: Array<Match>, data: Match, index: number, arr: Array<Match>) => {
        if (res.findIndex(league => league.id === data.id) < 0) {
            res.push(data);
        }
        return res;
    }, []);
}

export const getMatchesForLeagueId = (state: MatchesState, leagueId: number) => {
    return state.data.filter(match => match.homeTeam.leagueId === leagueId && match.awayTeam.leagueId === leagueId);
}

export const getMatchesForLeagueIdAndRound = (state: MatchesState, leagueId: number, round: number) => {
    return getMatchesForLeagueId(state, leagueId).filter(match => match.round === round);
}

export const getMatchesForDate = (state: MatchesState, date: Date) => {
    let startDate = new Date(date);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    let endDate = new Date(date);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;

    return state.data.filter(match => match.kickOffTimestamp >= startTimestamp && match.kickOffTimestamp <= endTimestamp);
}
