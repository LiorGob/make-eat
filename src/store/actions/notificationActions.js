export function closeNotification() {
    return dispatch => {
        dispatch({ type: 'CLOSE_NOTIFICATION' })
    }
}