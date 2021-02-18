import {http} from '@services';
import {constant, common} from '@utils';

const login = (name, pass, onSuccess, onFail) => {
    let url = constant.api_base_url + 'auth/login';
    let header = {
                    Accept : "application/json",
                    "Content-Type" : "application/json",
                    'x-api-key' : 'Pk6P3i0CVQLkgpgeQmqp'
                }
    let body = {
        username : name, 
        password : pass
    }
    http.doPost(url, header, body, onSuccess, onFail); 
};

const register = (user, onSuccess, onFail) => {
    let url = constant.api_base_url + 'user';
    let header = {
                    Accept : "application/json",
                    "Content-Type" : "application/json",
                    'x-api-key' : 'Pk6P3i0CVQLkgpgeQmqp'
                }
    http.doPost(url, header, user, onSuccess, onFail); 
};

export default {
    login, register
}; 
