import { defineStore } from 'pinia'

export type Notification = {
    color?: string
    message: string
    timeout?: number
}

export type RootState = {
    drawer: boolean | null
    notifications: Notification[]
}

export const useAppStore = defineStore('app', {
    state: () =>
        ({
            drawer: null,
            notifications: []
        }) as RootState,
    actions: {
        snackbar(message: string, options: Partial<Notification> = {}) {
            this.notifications.push({ message, ...options })
        }
    }
})
