/*
    the token default name for this application is tokenUserSys
*/

const recordToken = token => window.localStorage.setItem("tokenUserSys", token);

const removeToken = () => window.localStorage.removeItem("tokenUserSys");

const getToken = () => window.localStorage.getItem("tokenUserSys");


export {
    recordToken,
    removeToken,
    getToken
};