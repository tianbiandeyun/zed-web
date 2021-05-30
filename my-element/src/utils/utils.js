export const setSessionStorage = (...res) => {
    window.sessionStorage.setItem(res[0], res[1])
}

export const getSessionStorage = (res) => {
    return window.sessionStorage.getItem(res)
}