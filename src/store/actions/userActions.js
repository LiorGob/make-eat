import { userService } from '../../services/userService';
import { socketService } from '../../services/socketService';

export function loadUsers() {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch({ type: 'GET_USERS', users })
    }
} 

export function setLoggedUserAsUser(){
    return async dispatch => {
        dispatch({ type: 'SET_LOG_AS_USER', user: JSON.parse(sessionStorage.getItem('loggedInUser')) })
    }
}

export function getUser(id) {
    return async dispatch => {
        const user = await userService.getById(id)
        dispatch({ type: 'GET_USER', user })
    }
}

export function login(userCred) {
    return async dispatch => {
        const user = await userService.login(userCred)
        socketService.setup();
        dispatch({ type: 'LOGIN_USER', user })
    }
}

export function signup(userCreds) {
    return async dispatch => {
        const user = await userService.signup(userCreds)
        dispatch({ type: 'SINGUP_USER', user })
    }
}

export function logout() {
    return async dispatch => {
        await userService.logout();
        dispatch({ type: 'LOGOUT_USER', user: null });
    };
}