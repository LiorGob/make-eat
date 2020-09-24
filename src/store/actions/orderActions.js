
export function addNotification() {
    return async dispatch => {
        dispatch({ type: 'NOTIFY', msg: { type: 'success', txt: 'Your order is on the way!', icon: 'favorites' } });
    }
}


export function closeOrderNotification() {
    return dispatch => {
        dispatch({ type: 'CLOSE_ORDER_NOTIFICATION' })
    }
}