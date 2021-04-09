import {API_LOGIN, API_REGISTER, LOGOUT, LOAD_USER, SET_USER, SET_ANSWER} from '../actiontypes'

// api
export const doLogin=(payload)=>{
    return {type : API_LOGIN, payload : payload}
}

export const doRegister=(payload)=>{
    return {type : API_REGISTER, payload : payload}
}

export const doLogout=(payload)=>{
    return {type : LOGOUT, payload : payload}
}

// common
export const loadUserInfo=(payload)=>{
    return {type : LOAD_USER, payload : payload}
}

export const saveUserInfo = (payload) => {
    return {type : SET_USER, payload : payload}
}

export const setAnswer = (payload) => {
    return {type: SET_ANSWER, payload: payload}
}