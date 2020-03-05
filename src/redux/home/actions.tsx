import { HomeActions } from './types';
import { LoaderActions } from '../loader/types';
import send from '../../helpers/request';
import { doLoader } from '../loader/actions'

export function getBooksToHome(data) {
    return { type: HomeActions.GET_BOOKS, data };
}

export function getBooksAsync() {
  return (dispatch) => {
    send.send('GET','/books').then((data) => {
      dispatch(getBooksToHome(data.data.data));
      dispatch(doLoader(false))
    }).catch(error => {
      console.log('Error ******* ',error)
    })
  }
}