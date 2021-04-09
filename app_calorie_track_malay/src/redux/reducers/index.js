import {combineReducers} from 'redux';
// import reducers
import global from './global';
import user from './user';

export default combineReducers({
    global,user
});