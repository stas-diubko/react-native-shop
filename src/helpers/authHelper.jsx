import  jwt_decode from 'jwt-decode';
import { getStorageItem } from '../helpers/asyncStorageHelper';

export async function makeIsLoggedIn() {
    let isToken = await getStorageItem('token');
    return !!isToken;
};

export async function getToken() {
    let token = await getStorageItem('token');
    if(token) {
        let decoded = jwt_decode(token);
        return decoded;
    }
};