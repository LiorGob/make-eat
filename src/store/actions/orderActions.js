
export function addNotification() {
    return async dispatch => {
        dispatch({ type: 'NOTIFY', msg: { type: 'success', txt: 'Your order is on the way! The order will be delivered in 30 minutes', icon: 'shipping' } });
    }
}


export function closeOrderNotification() {
    return dispatch => {
        dispatch({ type: 'CLOSE_ORDER_NOTIFICATION' })
    }
}

export function updateOrderList(orderList) {
    return dispatch => {
        dispatch({ type: 'UPDATE_ORDER_LIST', orderList })
    }


}