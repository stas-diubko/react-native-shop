import { BasketState } from "./types";
import { RootState} from '../root.reducer'

export const initialState: BasketState = {
    numberBooks: 0
}

export function basketReducer(state: BasketState = initialState, action: any) {
    switch (action.type) {
        case 'ADD_BBOK': {
            return {
                ...state,
                numberBooks: action.data
            }
        }
        default:
            return state;
    }
}

export const basket = (state: RootState) => state.basket;