import { defineStore } from 'pinia'

export type Notification = {
    color?: string
    message: string
    timeout?: number
}

export type RootState = {
    drawer: {
        menu: boolean
        settings: boolean
    }
    notifications: Notification[]
}

export const useAppStore = defineStore('app', {
    state: () =>
        ({
            drawer: {
                menu: false,
                settings: false
            },
            notifications: []
        }) as RootState,
    actions: {
        snackbar(message: string, options: Partial<Notification> = {}) {
            this.notifications.push({ message, ...options })
        }
    }
})
