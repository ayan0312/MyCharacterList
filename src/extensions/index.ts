import { watchEffect, type App, type Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { i18n } from 'src/i18n'
import { router } from 'src/router'
import { useAppStore } from 'src/stores/app'

import type { ListItem } from 'src/components/app/List.vue'

/**
 * The raw extension record.
 */
export interface ExtensionRecordRaw {
    /**
     * The name of the extension.
     */
    name: string
    /**
     * The uuid of the extension.
     */
    uuid: string
    /**
     * The i18n options.
     */
    i18n?: ExtensionRecordI18nOptions
    /**
     * The routes of the app.
     */
    route?: RouteRecordRaw
    /**
     * The version of the extension.
     */
    version: number
    /**
     * The nav items of the navigation bar.
     */
    navItems?: ListItem[]
    /**
     * The global components.
     */
    component?: ExtensionRecordComponentOptions
}

/**
 * The i18n options.
 */
interface ExtensionRecordI18nOptions {
    /**
     * The root name of the components.
     * @example If the root name is `app` and the message name is `home`
     * ```ts
     * t('app.home')
     * ```
     */
    root: string
    /**
     * i18n messages.
     */
    messages: Record<string, Record<string, string>>
}

/**
 * The component options.
 */
interface ExtensionRecordComponentOptions {
    /**
     * The root name of the components.
     * @example If the root name is `App` and the component name is `Home`,
     * the final component name will be `AppHome`.
     */
    root: string
    /**
     * The global components.
     */
    components: Record<string, Component>
}

export class Extension implements ExtensionRecordRaw {
    public readonly name: string
    public readonly uuid: string
    public readonly version: number

    public readonly i18n?: ExtensionRecordI18nOptions
    public readonly route?: RouteRecordRaw
    public readonly navItems?: ListItem[]
    public readonly component?: ExtensionRecordComponentOptions

    private readonly handler: ExtensionHandler

    private loaded = false
    private removeRoute: (() => void) | null = null

    constructor(handler: ExtensionHandler, raw: ExtensionRecordRaw) {
        this.handler = handler

        this.name = raw.name
        this.uuid = raw.uuid
        this.version = raw.version

        if (raw.i18n) this.i18n = raw.i18n
        if (raw.route) this.route = raw.route
        if (raw.navItems) this.navItems = raw.navItems
        if (raw.component) this.component = raw.component
    }

    /**
     * Toggle the extension.
     */
    public toggle() {
        if (this.loaded) this.unload()
        else this.load()
    }

    /**
     * Load the extension.
     */
    public load() {
        if (this.loaded) return
        if (this.i18n) {
            const { root, messages } = this.i18n
            for (const locale in messages) {
                const message = messages[locale]
                i18n.global.mergeLocaleMessage(locale, {
                    [root]: message
                })
            }
        }
        if (this.route) this.removeRoute = router.addRoute(this.route)
        if (this.navItems)
            this.handler.store.addNavItems(
                this.navItems.map((item) => ({
                    uuid: this.uuid,
                    ...item
                }))
            )
        if (this.component)
            for (const key in this.component)
                this.handler.app.component(
                    `${this.component.root}${key}`,
                    this.component.components[key]
                )
        this.loaded = true
    }

    /**
     * Unload the extension.
     */
    public unload() {
        if (!this.loaded) return
        this.handler.store.filterNavItems((item) => item.uuid !== this.uuid)
        if (this.removeRoute) this.removeRoute()
        this.loaded = false
    }

    /**
     * Force unload the extension.
     */
    public forceUnload() {
        this.loaded = true
        this.unload()
    }
}

export class ExtensionHandler {
    public readonly app: App<Element>
    public readonly store: ReturnType<typeof useAppStore>

    private readonly map: Map<string, Extension> = new Map()

    constructor(app: App<Element>, store: ReturnType<typeof useAppStore>) {
        this.app = app
        this.store = store
    }

    /**
     * Register an extension.
     * @param raw The raw extension record
     * @returns The extension instance
     */
    public register(raw: ExtensionRecordRaw) {
        if (this.map.has(raw.uuid)) {
            console.warn(
                `Extension (${raw.name}) already registered or the uuid conflicts: ${raw.uuid}`
            )
            return
        }
        const extension = new Extension(this, raw)
        this.map.set(extension.uuid, extension)
    }

    /**
     * Unregister an extension.
     * @param uuid The uuid of the extension
     */
    public unregister(uuid: string) {
        const extension = this.map.get(uuid)
        if (!extension) {
            console.warn('Unknown extension: ' + uuid)
            return
        }
        extension.unload()
        this.map.delete(extension.uuid)
    }

    /**
     * Load all extensions.
     */
    public loadAll() {
        for (const extension of this.map.values()) {
            try {
                extension.load()
            } catch (err) {
                extension.forceUnload()
                if (err instanceof Error) this.store.snackbar(err.message, { color: 'error' })
                else this.store.snackbar('unknown error', { color: 'error' })
            }
        }
    }

    /**
     * Unload all extensions.
     */
    public unloadAll() {
        for (const extension of this.map.values()) extension.unload()
    }

    /**
     * Guard the routes without extensions.
     */
    public guardRoutesWithoutExtensions() {
        let back = ''
        const stopGuard = router.beforeEach((to) => {
            const necessaryRoute = router.getRoutes().some((route) => route.path === to.path)
            if (!necessaryRoute && !this.store.extensionsLoaded) {
                back = to.fullPath
                return '/loading-extensions'
            }
        })
        const stopWatch = watchEffect(() => {
            if (this.store.extensionsLoaded) {
                stopWatch()
                stopGuard()
                if (back) router.replace(back)
                else router.push('/')
            }
        })
    }
}

export function installExtensions({
    app,
    beforeUse,
    afterUse
}: {
    app: App<Element>
    beforeUse: () => void
    afterUse: () => void
}) {
    beforeUse()
    const store = useAppStore()
    const extensionHandler = new ExtensionHandler(app, store)
    app.config.globalProperties.$extensionHandler = extensionHandler
    app.provide('$extensionHandler', extensionHandler)
    extensionHandler.guardRoutesWithoutExtensions()
    afterUse()

    // Load and register the 'tournament' extension
    import('./tournament').then((raw) => {
        extensionHandler.register(raw.default)
        extensionHandler.loadAll()
        useAppStore().extensionsLoaded = true
    })
}
