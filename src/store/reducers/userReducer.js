let localLoggedinUser = null;
if (sessionStorage.loggedInUser) localLoggedinUser = JSON.parse(sessionStorage.loggedInUser);

const initialState = {
    users: [],
    user: [],
    loggedInUser: localLoggedinUser
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.users }
        case 'GET_USER':
            return { ...state, user: action.user }
        case 'SET_USER':
            return { ...state, loggedInUser: action.user }
        default:
            return state;

    }
}