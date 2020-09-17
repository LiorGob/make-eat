import {userService} from '../../services/userService'

export function loadUsers(){
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch({ type: 'GET_USERS', users })
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
        dispatch({ type: 'SET_USER', user })
    }
}

export function signup(userCreds){
    return async dispatch=>{
        const user= await userService.signup(userCreds)
        dispatch({ type: 'SET_USER', user })
    }
}

export function logout() {
    return async dispatch => {
      await userService.logout();
      dispatch({ type: 'SET_USER', user: null });
    };
  }