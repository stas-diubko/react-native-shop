import { HomeState } from "./types";
import { RootState} from '../root.reducer'

export const initialState: HomeState = {
    books: [],
    check: 0
}

export function homeReducer(state: HomeState = initialState, action: any) {
    switch (action.type) {
        case 'GET_BOOKS': {
            return {
                ...state,
                books: action.data
            }

        }
        default:
            return state;
    }
}

export const home = (state: RootState) => state.home;