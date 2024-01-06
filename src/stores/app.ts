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
    drawer: {
        menu: boolean
        settings: boolean
    }
    navItems: ListItem[]
    notifications: Notification[]
    loadedExtensions: boolean
}

export const useAppStore = defineStore('app', {
    state: () =>
        ({
            drawer: {
                menu: true,
                settings: false
            },
            navItems: Array.from(navItems),
            notifications: [],
            loadedExtensions: false
        }) as RootState,
    actions: {
        snackbar(message: string, options: Partial<Exclude<Notification, 'message'>> = {}) {
            this.notifications.push({ message, ...options })
        }
    }
})
