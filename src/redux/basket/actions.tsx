import { BasketActions } from './types';

export function addBookToBasket(data) {
    return { type: BasketActions.ADD_BBOK, data };
}

export const addProductToBasket = (data) => {
  return (dispatch) => {
      return dispatch(addBookToBasket(data));
  }
}