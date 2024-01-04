import locales from 'src/i18n/locales'

export function preferredLocale(locale = 'en') {
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
