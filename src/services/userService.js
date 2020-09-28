import httpService from './httpService'

export const userService={
    getUsers,
    getById,
    login,
    signup,
    logout,
    getLocalUser,
    getGuestUser
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

function getLocalUser(){
    return (sessionStorage.loggedInUser) ? JSON.parse(sessionStorage.loggedInUser) : getGuestUser();
}

function getGuestUser(){
    return { _id: Date.now(), fullName: 'Guest', isGuest: true, imgUrl: 'https://res.cloudinary.com/dbfuiddgm/image/upload/v1601299454/makeeat/users/guest_hpqyy9.png' };
}