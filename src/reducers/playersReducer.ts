import { AxiosError } from "axios";
import { Player } from "../models/Player";
import {
    PlayersAction,
    FETCH_PLAYERS_START,
    FETCH_PLAYERS_SUCCESS,
    FetchPlayersSuccessAction,
    FETCH_PLAYERS_ERROR,
    FetchPlayersErrorAction
} from "../actions/players";


export interface PlayersState {
    loading: boolean,
    error?: AxiosError,
    data: Array<Player>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const players = (state: PlayersState = initialState, action: PlayersAction) => {
    switch (action.type) {
        case FETCH_PLAYERS_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: mergePlayerArrays(state.data, (action as FetchPlayersSuccessAction).players)
            };
        case FETCH_PLAYERS_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchPlayersErrorAction).error
            }
        default:
            return state;
    }
}

const mergePlayerArrays = (oldState: Array<Player>, fetchedPlayers: Array<Player>) => {
    return [...oldState, ...fetchedPlayers].reduce((res: Array<Player>, data: Player, index: number, arr: Array<Player>) => {
        if (res.findIndex(player => player.id === data.id) < 0) {
            res.push(data);
        }
        return res;
    }, []);
}

export const getPlayersForTeamId = (state: PlayersState, teamId: number) => {
    return state.data.filter(player => player.team.id === teamId);
}
