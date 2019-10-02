import {
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    CategoriesAction,
    FetchCategoriesSuccessAction,
    FetchCategoriesErrorAction
} from '../actions/categories';
import { LeagueCategory } from '../models/LeagueCategory';

export interface CategoriesState {
    loading: boolean,
    error?: object,
    data: Array<LeagueCategory>
}

const initialState = {
    loading: false,
    error: undefined,
    data: []
}

export const categories = (state: CategoriesState = initialState, action: CategoriesAction) => {
    switch (action.type) {
        case FETCH_CATEGORIES_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: (action as FetchCategoriesSuccessAction).categories
            };
        case FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as FetchCategoriesErrorAction).error
            };
        default:
            return state;
    }
}
