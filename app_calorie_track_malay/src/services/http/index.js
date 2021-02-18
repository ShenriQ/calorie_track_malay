import axios from 'axios';
import qs from 'qs';

const doGet = async (url, header, onSuccess, onFail) => {
    try{
        let response = await axios({
            method  :'get',
            url : url,
            headers : header == null ? {
                Accept : "application/json",
                "Content-Type" : "application/json",
            } : header
        })
        let data = await response.data;
        onSuccess(data);
    }
    catch(err)
    {
        onFail(err);
    }
} 

const doGetAsync = async (url, header) => {
    try{
        let response = await axios({
            method  :'get',
            url : url,
            headers : header == null ? {
                Accept : "application/json",
                "Content-Type" : "application/json",
            } : header
        })
        let data = await response.data;
        return data;
    }
    catch(err)
    {
        return null;
    }
} 

const doPostForm = async (url, body, onSuccess, onFail) => {
    try{
        let response = await axios.post(url, qs.stringify(body), {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        let data = await response.data;
        onSuccess(data);
    }
    catch(err)
    {
        onFail(err);
    }
} 

const doPost = async (url, header, body, onSuccess, onFail) => {
    axios({
            method  :'post',
            url : url,
            headers : header == null ? {
                Accept : "application/json",
                "Content-Type" : "application/json",
            } : header,
            data : body
    })
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(err => {
        onFail(err)
    })
} 

const doPostFile = async (url, formData, onSuccess, onFail) => {
    try{
        let response = await axios({
            method  :'post',
            url : url,
            headers : {
                'Content-Type': 'multipart/form-data'
            },
            data : formData
        })
        let data = await response.data;
        onSuccess(data);
    }
    catch(err)
    {
        onFail(err);
    }
} 


export default {doGet, doGetAsync, doPostForm, doPost, doPostFile}