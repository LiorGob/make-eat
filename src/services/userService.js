import httpService from './httpService'

export const userService={
    getUsers,
    getById,
    login,
    signup,
    logout
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}


async function login(userCred) {
    //const user = await httpService.post('user/login', userCred)
    const users = await httpService.get('user');
    const user = users.find(user => user.email === userCred.email)
    return _handleLogin(user)
}

async function signup(userCred) {
    const user = await httpService.post('user', userCred)
    return _handleLogin(user)
}

async function logout() {
    //await httpService.post('user/logout')
    sessionStorage.clear();

}

function _handleLogin(user) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    return user;
}

function getLoggedInUser(){
    const user = sessionStorage.getItem('loggedInUser');
    if (user) return user;
}