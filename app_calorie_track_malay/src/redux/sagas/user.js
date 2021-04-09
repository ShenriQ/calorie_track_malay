import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import {
    API_LOGIN, API_REGISTER, LOAD_USER, LOGOUT
} from '../actiontypes';
import {showLoading, showToast} from '../actions/global'
import {saveUserInfo} from '../actions/user'
import { api_login, api_register, api_signout, api_read_userprofile, api_save_userprofile} from '../../apis/auth';
import {common, constant} from '../../utils'

export default function* watcherSaga() {
    yield takeEvery([
        API_LOGIN, API_REGISTER, LOAD_USER, LOGOUT,
    ], workerSaga);
}

function* workerSaga(action) {
    try {
        if (action.type == API_LOGIN) {
            yield put(showLoading({ show: true, msg: 'Signing in ...' }))

            const res1 = yield call(api_login, action.payload)
            common.printLog('Saga-User api_login : ', res1)

            const res2 = yield call(api_read_userprofile, res1.user.uid)
            common.printLog('Saga-User api_read_userprofile : ', res2)

            yield call(common._storeData, constant.Key_userdata, res2);
            yield put(saveUserInfo(res2));

            yield put(showLoading())
        }
        else if (action.type == API_REGISTER) {
            yield put(showLoading({ show: true, msg: 'Registering ...' }))

            const res1 = yield call(api_register, action.payload)
            common.printLog('Saga-User api_register : ', res1)

            let user_profile = { uid : res1.user.uid, ...action.payload, pass : ''}
            const res2 = yield call(api_save_userprofile, res1.user.uid , user_profile)
            common.printLog('Saga-User api_save_userprofile : ', res2)

            yield call(common._storeData, constant.Key_userdata, user_profile);
            yield put(saveUserInfo(user_profile));

            yield put(showLoading())
        }
        else if (action.type == LOGOUT) {
            yield put(showLoading({ show: true, msg: 'Signing out ...' }))

            const res1 = yield call(api_signout, action.payload)
            common.printLog('Saga-User api_signout : ', res1)

            yield call(common._removeData, constant.Key_userdata);
            yield put(saveUserInfo());

            yield put(showLoading())
        }
        else if (action.type == LOAD_USER) {
            const response = yield call(common._retrieveData, constant.Key_userdata);
            yield put(saveUserInfo(response));
        }
    } 
    catch (e) {
        common.printLog('Error : Saga-User : ', e.code)
        yield put(showLoading())
        if (e.code == 'auth/invalid-email') {
            yield put(showToast({ type: 'error', msg: 'That email address is invalid!' }))
        }
        else if (e.code == 'auth/user-not-found') {
            yield put(showToast({ type: 'error', msg: 'Invalid credentials!' }))
        }
        else if (e.code == 'auth/weak-password') {
            yield put(showToast({ type: 'error', msg: 'Weak password!' }))
        }
        else if (e.code == 'auth/wrong-password') {
            yield put(showToast({ type: 'error', msg: 'Wrong password!' }))
        }
        else if (e.code == 'auth/email-already-in-use') {
            yield put(showToast({ type: 'error', msg: 'That email address is already in use!' }))
        }
        else {
            yield put(showToast({ type: 'error', msg: 'Something went wrong!' }))
        }
    }
}
