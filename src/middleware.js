
export function middleware(router, callback) {
    if(typeof window != 'undefined') {
        const routerName = router.pathname.toLowerCase();
        if(typeof callback == 'function') {
            callback(false);
        }
        if(routerName == '/login' || routerName =='/register') {
            if(window.localStorage.getItem('token')) {
                router.push('/home');
            }
        }else {
            if(!window.localStorage.getItem('token')) {
                if(routerName == '/profile') {
                    router.push('/login');
                }else {
                    router.push('/home');
                }
            }else {
                if(typeof callback == 'function') {
                    callback(true);
                }
            }
        }
    }
}