import { defineStore } from 'pinia'
import navItems from './data_navItems'
import type { ListItem } from 'src/components/app/List.vue'

export type Notification = {
    /**
     * success, info, warning, error.
     * Applies specified color to the control - supports utility colors (for example success or purple)
     * or css color (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
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
        snackbar(message: string, options: Partial<Exclude<Notification, 'message'>> = {}) {
            this.notifications.push({ message, ...options })
        }
    }
})
