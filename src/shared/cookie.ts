import Cookies from 'js-cookie'

const Keys = {
    language: 'myCharListLang',
    token: 'myCharListToken'
}

export const getLanguage = () => Cookies.get(Keys.language)
export const setLanguage = (language: string) => Cookies.set(Keys.language, language)

export const getToken = () => Cookies.get(Keys.token)
export const setToken = (token: string) => Cookies.set(Keys.token, token)
export const removeToken = () => Cookies.remove(Keys.token)
