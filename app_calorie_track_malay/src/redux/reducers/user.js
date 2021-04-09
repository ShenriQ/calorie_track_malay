import {SET_USER, SET_ANSWER,} from '../actiontypes';

const initialState = {
    user : {},
    answerInfo : {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {
                user : action.payload || initialState.user
            })
        case SET_ANSWER :
            return Object.assign({}, state, {
                answerInfo : action.payload || initialState.answerInfo
            })
        default:
            return state
    }
}

export default userReducer;