import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { myAxios } from "../utils/axios";
import * as api from '../constants/api';
import { Player } from "../models/Player";
import { AxiosError } from "axios";

export const FETCH_PLAYERS_START = 'FETCH_PLAYERS_START';
export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';

export interface FetchPlayersStartAction {
    type: string
}

export interface FetchPlayersSuccessAction {
    type: string,
    players: Array<Player>
}

export interface FetchPlayersErrorAction {
    type: string,
    error: AxiosError
}

export type PlayersAction = FetchPlayersStartAction | FetchPlayersSuccessAction | FetchPlayersErrorAction;

export const fetchPlayersStart = (): PlayersAction => {
    return {
        type: FETCH_PLAYERS_START
    };
}

export const fetchPlayersSuccess = (players: Array<Player>): PlayersAction => {
    return {
        type: FETCH_PLAYERS_SUCCESS,
        players: players
    };
}

export const fetchPlayersError = (error: AxiosError): PlayersAction => {
    return {
        type: FETCH_PLAYERS_ERROR,
        error: error
    };
}

export const fetchForTeamId = (teamId: number): ThunkAction<Promise<void>, {}, {}, PlayersAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, PlayersAction>): Promise<void> => {
        dispatch(fetchPlayersStart());
        myAxios().get(api.PLAYERS, {
            params: {
                teamId: teamId
            }
        })
            .then(response => {
                dispatch(fetchPlayersSuccess(response.data));
                Promise.resolve();
            })
            .catch((error: AxiosError) => {
                dispatch(fetchPlayersError(error));
                Promise.reject();
            })
    };
}
