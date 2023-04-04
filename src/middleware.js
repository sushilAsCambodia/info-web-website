
export function middleware(router, callback) {
    if(typeof window != 'undefined') {
        if(typeof callback == 'function') {
            callback(false)
        }
        if(!window.localStorage.getItem('token')) {
            router.push('/home');
        }else {
            if(typeof callback == 'function') {
                callback(true)
            }
        }
    }
}