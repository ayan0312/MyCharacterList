export const customThemes = Object.fromEntries(
    Object.entries(import.meta.glob('../themes/colors/*.json', { eager: true })).map(
        ([key, value]) => {
            return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
        }
    )
)
