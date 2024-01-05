import { defineStore } from 'pinia'

import locales from 'src/i18n/locales'
import { getToken, removeToken, setToken } from 'src/shared/cookie'
import type { User } from 'src/apis/user'

function preferredLocale(locale = 'en') {
    const languages = ([] as string[]).concat(
        window.localStorage.getItem('currentLocale') || [],
        navigator.languages || []
    )

    const language =
        languages.find((l) =>
            locales.some((locale) => locale.enabled && l === (locale.alternate || locale.locale))
        ) || locale
    return language
}

const createDefaultUserSettings = () => {
    const settings = localStorage.getItem('settings')
    if (settings) {
        try {
            return JSON.parse(settings)
        } catch (e) {
            console.error(e)
        }
    }

    const defaultSettings = {
        theme: 'light',
        locale: preferredLocale(),
        quickbar: false
    }

    localStorage.setItem('settings', JSON.stringify(defaultSettings))
    return defaultSettings
}

export const useUserStore = defineStore('user', {
    state: () =>
        ({
            token: getToken() || '',
            name: '',
            avatar: '',
            settings: createDefaultUserSettings(),
            introduction: '',
            notifications: [
                {
                    id: 1,
                    read: false,
                    emoji: '🎉',
                    title: 'First Notification',
                    content: 'no content.',
                    created: 0,
                    updated: 0,
                    metadata: {
                        href: import.meta.env.VITE_GITHUB_REPOSITORY_URL,
                        text: 'Open Repository'
                    }
                }
            ]
        }) as User,
    actions: {
        setUser({ name, token, avatar, settings, introduction }: User) {
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
        readNotification(id: number) {
            const notification = this.notifications.find((n) => n.id === id)
            if (notification) notification.read = true
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
