import { userService } from '../../services/userService'
let localLoggedinUser = userService.getLocalUser();

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
        case 'LOGIN_USER':
        case 'SINGUP_USER':
        case 'LOGOUT_USER':
            return { ...state, loggedInUser: action.user }
        case 'SET_LOG_AS_USER':
            return { ...state, user: action.user }
        default:
            return state;
    }
}