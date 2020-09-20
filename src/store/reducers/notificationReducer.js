const initialState = {
    msg: {
        type: null,
        txt: null
    },
    reviewDialog: false
}

export function notificationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'NOTIFY':
            return { ...state, msg: action.msg };
        case 'CLOSE_NOTIFICATION':
            return { ...state, msg: {type: null, txt: null }};
        case 'REVIEW_DIALOG_OPEN':
            return { ...state, reviewDialog: true };
        case 'REVIEW_DIALOG_CLOSE':
            return { ...state, reviewDialog: false };
        default:
            return state;

    }
}