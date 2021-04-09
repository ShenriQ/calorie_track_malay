import { SHOW_LOAD, SHOW_TOAST } from '../actiontypes';

const initialState = {
    loading: { show: false, msg: '' },
    toast: { type: '', msg: '' }
}

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOAD:
            return Object.assign({}, state, {
                loading: action.payload || initialState.loading
            })
        case SHOW_TOAST:
            return Object.assign({}, state, {
                toast: action.payload || initialState.toast
            })
        default:
            return state
    }
}

export default GlobalReducer;