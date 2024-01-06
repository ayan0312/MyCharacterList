export interface LocaleOptions {
    /**
     * The title of the locale.
     */
    title: string
    /**
     * The locale code.
     */
    locale: string
    /**
     * Whether the locale is enabled.
     */
    enabled: boolean
    /**
     * The alternate locale code.
     */
    alternate?: string
}

const locales: LocaleOptions[] = [
    {
        title: 'English',
        locale: 'en',
        enabled: true
    },
    {
        title: '简体中文',
        locale: 'zh-CN',
        alternate: 'zh-Hans',
        enabled: true
    },
    {
        title: '日本語',
        locale: 'ja-JP',
        alternate: 'ja',
        enabled: false
    }
]

export default locales
