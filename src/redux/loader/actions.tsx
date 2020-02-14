import { LoaderActions } from './types';

export function doLoader(data) {
    return { type: LoaderActions.ON_LOADER, data}
}

export const onLoader = (data) => {
    return (dispatch) => {
        return dispatch(doLoader(data));
    }
}