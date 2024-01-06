import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { useUserStore } from 'src/stores/user'

// Types
import type { App } from 'vue'

const messages = Object.fromEntries(
    Object.entries(import.meta.glob('../i18n/messages/*.json', { eager: true })).map(
        ([key, value]) => {
            return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
        }
    )
)

export const i18n = createI18n({
    legacy: false,
    messages
})

export default {
    install(app: App<Element>) {
        const localeStore = useUserStore()
        watch(
            () => localeStore.settings.locale,
            (locale) => {
                i18n.global.locale.value = locale
            },
            { immediate: true }
        )
        app.use(i18n)
    }
}
