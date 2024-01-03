import locales from 'src/i18n/locales'
import { IN_BROWSER } from './globals'

export function preferredLocale(locale = 'en') {
    if (!IN_BROWSER) return locale

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
