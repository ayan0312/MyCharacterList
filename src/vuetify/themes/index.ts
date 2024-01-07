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
    default: string
    nav?: string
    menu?: string
}

function matchThemeImages(themeName: string, key: keyof ThemeImages) {
    const theme = themes[themeName]
    if (!theme) return undefined
    const images: ThemeImages | undefined = theme['background-images']
    if (!images) return undefined
    return images[key] || images.default
}

export function useThemeImage(place: keyof ThemeImages = 'default') {
    const theme = useTheme()
    const image = computed(() => matchThemeImages(theme.name.value, place))
    return { image }
}
