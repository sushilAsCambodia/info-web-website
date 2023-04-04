import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'content-type':'application/json'
    },
});

export default {
    get: (url, params = {}) => {
        return instance({
            'method': 'GET',
            'url': url,
            'params': params,
            transformResponse: [function (data) { 
                const json = JSON.parse(data) 
                data = json
                return data;
            }],
        });
    },
    post: (url, body = {}) => {
        return instance({
            'method': 'POST',
            'url':url,
            'data':body,
            'headers': { 
                'content-type':'application/json'
            }, // override instance defaults
        });
    }
}