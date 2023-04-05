


export const DrawerModelPopUp = (callback) => async (dispatch) => {
    try {
        dispatch({
            type: 'DRAWER_MODEL',
            payload: true,
        })
  
    } catch (e) {
        // return callback(e);
    }
  }
  