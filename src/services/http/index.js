import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'content-type':'application/json'
    },
});

export default {
    get: () => {
        return instance({
            'method':'GET',
            'url':'/products',
            'params': {
                'search':'parameter',
            },
            transformResponse: [function (data) {
                // Do whatever you want to transform the data
                console.log('Transforming data...')
                const json = JSON.parse(data) 
                data = json
                return data;
            }],
        });
    },
    post: () => {
        return instance({
            'method': 'POST',
            'url':'/api',
            'data': {
                'item1':'data1',
                'item2':'item2'
            },
            'headers': { 'content-type':'application/json'}, // override instance defaults
        });
    }
}