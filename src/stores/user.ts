import { defineStore } from 'pinia'

import locales from 'src/i18n/locales'
import { preferredLocale } from 'src/shared/routes'
import { getToken, removeToken, setToken } from 'src/shared/cookie'

export interface UserSettings {
    theme: string
    locale: string
    quickbar: boolean
}

const createDefaultUserSettings = () => ({
    theme: 'light',
    locale: preferredLocale(),
    quickbar: false
})

interface UserInfomation {
    name: string
    token: string
    avatar: string
    settings: UserSettings
    introduction: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken() || '',
        name: '',
        avatar: '',
        settings: createDefaultUserSettings(),
        introduction: ''
    }),
    actions: {
        setUser({ name, token, avatar, settings, introduction }: UserInfomation) {
            this.name = name
            this.token = token
            this.avatar = avatar
            this.settings = settings
            this.introduction = introduction
            setToken(token)
            this.setLocale(settings.locale)
        },
        setLocale(locale: string) {
            if (this.settings.locale === locale) return
            const result = locales.find((l) => l.locale === locale && l.enabled)
            if (result) this.settings.locale = result.locale
            else this.settings.locale = preferredLocale()
        },
        signOut() {
            this.name = ''
            this.token = ''
            this.avatar = ''
            this.settings = createDefaultUserSettings()
            this.introduction = ''
            removeToken()
        }
    }
})
