import { LoginActions } from './types';
import send from '../../helpers/request';
import { setStorageItem } from '../../helpers/asyncStorageHelper';

export function onLogin(data) {
    setStorageItem('token', data);
    return { type: LoginActions.ON_LOGIN };
}

export function onRegistern(data) {
  return { type: LoginActions.ON_REGISTER, data };
}

export function onLogout() {
  return { type: LoginActions.ON_LOGOUT };
}

export function offIsRegister() {
  return { type: LoginActions.OFF_REGISTER };
}

export const onLoginAsync = (data) => {
  return (dispatch) => {
    send.send('POST','login', data).then((data) => {
      if(data.data.success) {
        return dispatch(onLogin(data.data.data));
      }
    }).catch(error => {
      console.log('Error ******* ',error)
    })
  }
}

export const onRegisterAsync = (data) => {
  return (dispatch) => {
    send.send('POST','users/register', data).then((data) => {
      if(data.data.success) {
        dispatch(onRegistern(true));
        setTimeout(()=>{
          dispatch(offIsRegister());
        }, 500)
      }
    }).catch(error => {
      console.log('Error ******* ',error)
    })
  }
}