import { MenuState } from "./types";
import { RootState } from "../root.reducer";

export const initialState: MenuState = {
    quantity: 0
}

export function menuReducer(state: MenuState = initialState, action: any) {
    switch (action.type) {
        case 'ON_CLICK': {
            return {
                ...state,
                quantity: action.data
            }
        }
        default:
            return state;
    }
}

export const loader = (state: RootState) => state.menu;
