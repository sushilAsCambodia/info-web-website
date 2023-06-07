import axios from 'axios'
import utils from '@/common/utils';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: utils.baseUrl || '',
    headers: {
        'content-type':'application/json'
    },
});
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if(error && error.response && error.response.status === 401) {
        Cookies.remove('token');
        setTimeout(() => {
            window.location = '/login';
        }, 1);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
const http = {
    get: (url, params = {}, auth = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; 
        let fakeUrl = undefined;
        console.log("http get:::",params,Object.keys(params).length)

        if(Object.keys(params).length > 0 && params?.fake === true) {
            fakeUrl  = process.env.fronEndShareUrl
        }
        if(auth) {
            header['Authorization'] = 'Bearer '+ (Cookies.get(utils.tokenKey) || '');
        }
        return instance({
            'method': 'GET',
            'url': (fakeUrl ? fakeUrl : '') + url,
            'params': params,
            'headers': header,
            transformResponse: [function (data) { 
                const json = JSON.parse(data)
                data = json
                return data;
            }],
        })
    },
    post: (url, body = {}, auth = false, formdata = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; // override instance defaults
        if(auth) {
            header['Authorization'] = 'Bearer '+ (Cookies.get(utils.tokenKey) || '');
        }
        if(formdata) {
            header["Content-Type"] = "multipart/form-data";
        }
        return instance({
            'method': 'POST',
            'url':url,
            'data':body,
            'headers': header
        });
    },
    put: (url, body = {}, auth = false, formdata = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; // override instance defaults
        if(auth) {
            header['Authorization'] = 'Bearer '+ (Cookies.get(utils.tokenKey) || '');
        }
        if(formdata) {
            header["Content-Type"] = "multipart/form-data";
        }
        return instance({
            'method': 'PUT',
            'url':url,
            'data':body,
            'headers': header
        });
    },
    delete: (url, body = {}, auth = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; // override instance defaults
        if(auth) {
            header['Authorization'] = 'Bearer '+ (Cookies.get(utils.tokenKey) || '');
        }
        return instance({
            'method': 'DELETE',
            'url':url,
            'data':body,
            'headers': header
        });
    },
}
export default http;