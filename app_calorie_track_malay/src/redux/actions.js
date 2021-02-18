import {ADD_USER, API_ERROR} from './action-type';

export function addUser(userObj) {
    return { type: ADD_USER, payload: userObj}
}