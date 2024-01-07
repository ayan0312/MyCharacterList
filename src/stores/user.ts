import { defineStore } from 'pinia'

import locales from 'src/i18n/locales'
import { getToken, removeToken, setToken } from 'src/shared/cookie'
import type { UserNotification, UserSettings } from 'src/apis/user'

/**
 * Get the preferred locale.
 * @param locale The default locale.
 * @returns The preferred locale.
 */
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

/**
 * Create the default user settings.
 * @returns The default user settings.
 */
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

interface UserState {
    /**
     * The user name.
     */
    name: string
    /**
     * The user token.
     */
    token: string
    /**
     * The user avatar.
     */
    avatar: string
    /**
     * The user settings.
     */
    settings: UserSettings
    /**
     * The user introduction.
     */
    introduction: string
    /**
     * The user notifications.
     */
    notifications: UserNotification[]
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
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
    }),
    actions: {
        /**
         * Sets the user information.
         * @param userState The user state object.
         */
        setUser({ name, token, avatar, settings, introduction, notifications }: UserState) {
            this.name = name
            this.token = token
            this.avatar = avatar
            this.settings = settings
            this.introduction = introduction
            this.notifications = notifications
            setToken(token)
            this.setLocale(settings.locale)
        },
        /**
         * Sets the locale for the user.
         * @param locale The locale to set.
         */
        setLocale(locale: string) {
            if (this.settings.locale === locale) return
            const result = locales.find((l) => l.locale === locale && l.enabled)
            if (result) this.settings.locale = result.locale
            else this.settings.locale = preferredLocale()
        },
        /**
         * Marks a notification as read.
         * @param id The ID of the notification to mark as read
         */
        readNotification(id: number) {
            const notification = this.notifications.find((n) => n.id === id)
            if (notification) notification.read = true
        },
        /**
         * Signs out the user.
         */
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
