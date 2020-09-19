const initialState = {
    msg: {
        type: null,
        txt: null
    }
}

export function notificationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'NOTIFY':
            return { ...state, msg: action.msg };
        case 'CLOSE_NOTIFICATION':
            return { ...state, msg: {type: null, txt: null }};
        default:
            return state;

    }
}