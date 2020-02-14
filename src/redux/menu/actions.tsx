import { MenuActions } from './types';

export function clickMenu(data) {
    return { type: MenuActions.ON_CLICK, data };
}

export const onClickMenu = (data) => {
  return (dispatch) => {
      return dispatch(clickMenu(data));
  }
}