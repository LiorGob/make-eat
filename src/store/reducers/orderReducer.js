const initialState = {
    msg: {
        type: null,
        txt: null
    },
    orderListSize: 0
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'NOTIFY':
            return { ...state, msg: action.msg };
        case 'CLOSE_ORDER_NOTIFICATION':
            return { ...state, msg: { type: null, txt: null } };
        case 'UPDATE_ORDER_LIST':
            console.log(action.orderListSize);
            return { ...state, orderListSize: action.orderListSize }
        default:
            return state;
    }
}