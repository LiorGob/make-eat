const initialState = {
    msg: {
        type: null,
        txt: null
    },
    orderList: []
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'NOTIFY':
            return { ...state, msg: action.msg };
        case 'CLOSE_ORDER_NOTIFICATION':
            return { ...state, msg: { type: null, txt: null } };
        case 'UPDATE_ORDER_LIST':
            return { ...state, orderList: action.orderList }
        default:
            return state;
    }
}