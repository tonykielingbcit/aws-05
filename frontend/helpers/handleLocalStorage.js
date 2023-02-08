import jwtDecode from "jwt-decode";

const recordUser = token => {
    window.localStorage.setItem("token", token);
};

const getUser = token => {
    const getToken = window.localStorage.getItem(token)

    if (getToken) {
        const decodeToken = jwtDecode(getToken);
        return decodeToken;
    }
}

export {
    recordUser,
    getUser
};