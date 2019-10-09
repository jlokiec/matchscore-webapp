import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as api from '../constants/api';
import { LeagueCategory } from '../models/LeagueCategory';
import { myAxios } from '../utils/axios';

export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

export interface FetchCategoriesStartAction {
    type: string
}

export interface FetchCategoriesSuccessAction {
    type: string,
    categories: Array<LeagueCategory>
}

export interface FetchCategoriesErrorAction {
    type: string,
    error: object
}

export type CategoriesAction = FetchCategoriesStartAction | FetchCategoriesSuccessAction | FetchCategoriesErrorAction;

export const fetchCategoriesStart = (): FetchCategoriesStartAction => {
    return {
        type: FETCH_CATEGORIES_START
    };
}

export const fetchCategoriesError = (error: object): FetchCategoriesErrorAction => {
    return {
        type: FETCH_CATEGORIES_ERROR,
        error: error
    };
}

export const fetchCategoriesSuccess = (categories: Array<LeagueCategory>): FetchCategoriesSuccessAction => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories: categories
    };
}

export const fetch = (): ThunkAction<Promise<void>, {}, {}, CategoriesAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, CategoriesAction>): Promise<void> => {
        dispatch(fetchCategoriesStart());
        myAxios().get(api.LEAGUE_CATEGORIES)
            .then(response => {
                dispatch(fetchCategoriesSuccess(response.data));
                Promise.resolve();
            })
            .catch(error => {
                dispatch(fetchCategoriesError(error));
                Promise.reject();
            })
    };
}
