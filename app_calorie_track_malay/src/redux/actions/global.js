import {SHOW_LOAD, SHOW_TOAST,} from '../actiontypes'

export const showLoading=(payload)=>{
    return {type : SHOW_LOAD, payload : payload}
}

export const showToast=(payload)=>{
    return {type : SHOW_TOAST, payload : payload}
}
