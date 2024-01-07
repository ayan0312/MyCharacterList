import { computed } from 'vue'
import { useTheme } from 'vuetify'

export const themes = Object.fromEntries(
    Object.entries(import.meta.glob('../themes/colors/*.json', { eager: true })).map(
        ([key, value]) => {
            return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
        }
    )
)

export interface ThemeImages {
    /**
     * The default background image.
     */
    default: string
    /**
     * The nav background image.
     */
    nav?: string
    /**
     * The menu background image.
     */
    menu?: string
}

/**
 * Match the theme images.
 * @param themeName The theme name.
 * @param key The key of the image.
 * @returns The matched image.
 */
function matchThemeImages(themeName: string, key: keyof ThemeImages) {
    const theme = themes[themeName]
    if (!theme) return undefined
    const images: ThemeImages | undefined = theme['background-images']
    if (!images) return undefined
    return images[key] || images.default
}

/**
 * Use the theme image.
 * @param place The place of the image.
 * @returns The theme image.
 */
export function useThemeImage(place: keyof ThemeImages = 'default') {
    const theme = useTheme()
    const image = computed(() => matchThemeImages(theme.name.value, place))
    return { image }
}
