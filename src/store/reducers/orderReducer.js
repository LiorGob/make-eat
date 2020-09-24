const initialState = {
    msg: {
        type: null,
        txt: null
    },
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'NOTIFY':
            return { ...state, msg: action.msg };
        case 'CLOSE_ORDER_NOTIFICATION':
            return { ...state, msg: {type: null, txt: null }};
    
        default:
            return state;
    }
}