import { HomeActions } from './types';

export function getBooksToHome(data) {
    return { type: HomeActions.GET_BOOKS, data };
}