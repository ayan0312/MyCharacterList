import { defineStore } from 'pinia'
import navItems from './data_navItems'
import type { ListItem } from 'src/components/app/List.vue'

export type Notification = {
    color?: string
    message: string
    timeout?: number
}

export type RootState = {
    items: ListItem[]
    drawer: {
        menu: boolean
        settings: boolean
    }
    notifications: Notification[]
}

export const useAppStore = defineStore('app', {
    state: () =>
        ({
            items: Array.from(navItems),
            drawer: {
                menu: true,
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
