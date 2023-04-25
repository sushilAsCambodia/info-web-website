import axios from 'axios'
import utils from '@/common/utils';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: utils.baseUrl || '',
    headers: {
        'content-type':'application/json'
    },
});
const http = {
    get: (url, params = {}, auth = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; 
        let fakeUrl = undefined;
        if(Object.keys(params).length > 0 && params?.fake === true) {
            fakeUrl  = 'http://localhost:3000/api';
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
        });
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
    }
}
export default http;