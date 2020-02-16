import { LoaderState } from "./types";
import { RootState} from '../root.reducer'

export const initialState: LoaderState = {
    isActiveLoader: false
}

export function loaderReducer(state: LoaderState = initialState, action: any) {
    switch (action.type) {
        case 'ON_LOADER': {
            return {
                ...state,
                isActiveLoader: action.data
            }
        }
        default:
            return state;
    }
}

export const loader = (state: RootState) => state.loader;