import { defineStore } from 'pinia'
import type { ListItem } from 'src/components/app/List.vue'

/**
 * A notification to display.
 */
export type Notification = {
    /**
     * success, info, warning, error.
     * Applies specified color to the control - supports utility colors (for example success or purple)
     * or css color (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color?: string
    /**
     * The text to display.
     */
    message: string
    /**
     * The number of milliseconds to wait before automatically dismissing the notification.
     */
    timeout?: number
}

export type RootState = {
    /**
     * Whether the menu drawer is open.
     */
    drawer: {
        /**
         * Whether the menu drawer is open.
         */
        menu: boolean
        /**
         * Whether the settings drawer is open.
         */
        settings: boolean
    }
    /**
     * The navigation items.
     */
    navItems: ListItem[]
    /**
     * The notifications to display.
     */
    notifications: Notification[]
    /**
     * Whether the extensions have been loaded.
     */
    loadedExtensions: boolean
}

export const useAppStore = defineStore('app', {
    state: () =>
        ({
            drawer: {
                menu: true,
                settings: false
            },
            navItems: [],
            notifications: [],
            loadedExtensions: false
        }) as RootState,
    actions: {
        /**
         * Display a snackbar notification.
         * @param message The message to display
         * @param options Additional options for the notification
         */
        snackbar(message: string, options: Partial<Exclude<Notification, 'message'>> = {}) {
            this.notifications.push({ message, ...options })
        },
        /**
         * Add navigation items.
         * @param items The navigation items to add
         */
        addNavItems(items: ListItem[]) {
            this.navItems.push(...items)
        },
        /**
         * Filter the navigation items.
         * @param predicate The predicate to filter the navigation items
         */
        filterNavItems(predicate: (item: ListItem) => boolean) {
            this.navItems = this.navItems.filter(predicate)
        }
    }
})
