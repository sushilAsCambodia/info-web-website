import axios from 'axios'
import utils from '@/common/utils';
import Cookies from 'js-cookie';
const instance = axios.create({
    baseURL: utils.baseUrl || '',
    headers: {
        'content-type':'application/json'
    },
});

export default {
    get: (url, params = {}) => {
        let fakeUrl = undefined;
        if(Object.keys(params).length > 0 && params?.fake === true) {
            fakeUrl  = 'http://localhost:3000/api';
        }
        return instance({
            'method': 'GET',
            'url': (fakeUrl ? fakeUrl : '') + url,
            'params': params,
            transformResponse: [function (data) { 
                const json = JSON.parse(data)
                data = json
                return data;
            }],
        });
    },
    post: (url, body = {}, auth = false) => {
        const header = { 
            'content-type':'application/json; charset=utf-8'
        }; // override instance defaults
        if(auth) {
            header['Authorization'] = 'Bearer '+ (Cookies.get(utils.tokenKey) || '');
        }
        return instance({
            'method': 'POST',
            'url':url,
            'data':body,
            'headers': header
        });
    }
}