import { Reducer, combineReducers } from "redux";
import { HomeState } from "./home/types";
import { homeReducer } from "./home/reducer";
import { loaderReducer } from "./loader/reducer";
import { LoaderState } from "./loader/types";
import { MenuState } from "./menu/types";
import { menuReducer } from "./menu/reducer";
import { BasketState } from "./basket/types";
import { basketReducer } from "./basket/reducer";

export interface RootState {
    home: HomeState;
    loader: LoaderState;
    menu: MenuState;
    basket: BasketState
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    home: homeReducer,
    loader: loaderReducer,
    menu: menuReducer,
    basket: basketReducer
})

// const rootReducer = ( state, action ) => {
//     console.log('Test if rootReducer is ever called')
//     return {
//         home: homeReducer( state, action ),
//         loader: loaderReducer( state, action ),
//     }
// }

export default rootReducer;
