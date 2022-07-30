export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const getToken = () => {
    return localStorage.getItem('token') // 注意返回用户token
}

export const removeToken = () => {
    localStorage.removeItem('token')
}