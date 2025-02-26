export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (name, email, user, password) => ({
    type: LOGIN,
    payload: {
        name: name,
        email: email,
        user: user,
        password: password
    }
})

export const logout = (email) => ({
    type: LOGOUT,
    payload: email
})
