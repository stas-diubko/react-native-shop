import { HomeState } from "./types";
import { RootState} from '../root.reducer'

export const initialState: HomeState = {
    books: []
}

export function homeReducer(state: HomeState = initialState, action: any) {
    switch (action.type) {
        case 'GET_BOOKS': {
            return {
                ...state,
                books: action.payload.books
            }
        }
    }
}

export const home = (state: RootState) => state.home;