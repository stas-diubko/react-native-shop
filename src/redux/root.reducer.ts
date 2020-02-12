import { Reducer, combineReducers } from "redux";
import { HomeState } from "./home/types";
import { homeReducer } from "./home/reducer";

export interface RootState {
    home: HomeState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    home: homeReducer,
})

export default rootReducer;
