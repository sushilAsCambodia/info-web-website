
export function middleware(router, callback) {
    if(typeof window != 'undefined') {
        const routerName = router.pathname.toLowerCase();
        if(routerName == '/login' || routerName =='/register') {
            if(window.localStorage.getItem('token')) {
                if(typeof callback == 'function') {
                    callback(true);
                }
            }else {
                if(typeof callback == 'function') {
                    callback(false);
                }
            }
        }else {
            if(window.localStorage.getItem('token')) { 
                if(typeof callback == 'function') {
                    callback(true);
                }
            }else {
                if(typeof callback == 'function') {
                    callback(false);
                }
            }
        }
    }
}