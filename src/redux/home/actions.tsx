import { HomeActions } from './types';
import send from '../../helpers/request';
import axios from 'axios';


export function getBooksToHome(data) {
    return { type: HomeActions.GET_BOOKS, data };
}

export const getBooksAsync = () => {
  return (dispatch) => {
    send.send('GET','/books').then((data) => {
      return dispatch(getBooksToHome(data.data.data));
    }).catch(error => {
      console.log('Error ******* ',error)
    })
  }
}