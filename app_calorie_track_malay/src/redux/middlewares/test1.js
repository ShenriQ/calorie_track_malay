import {GET_USER} from '../actiontypes';

export const test1 = ({getState, dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type == GET_USER)
            {   
                // // get current store's state
                // const state = getState()
                // if(action.payload.type != 'student' &&  state.cartReducer.cart.student != null && state.cartReducer.cart.student.length > 0) {
                //     return dispatch({type : SHOW_TOAST, payload : {type : 'warning', msg : 'You can not select more! Student Lunch Box foods already exists in your cart!'}})
                // }
            }
            return next(action)
        }   
    }
}