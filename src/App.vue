<template>
    <layouts-home />
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useTheme } from 'vuetify'

import LayoutsHome from 'src/layouts/home.vue'

import { useUserStore } from './stores/user'

const user = useUserStore()
const theme = useTheme()
const systemTheme = ref('light')

let media: MediaQueryList

watch(
    () => user.settings.theme,
    (val) => {
        if (val === 'system') {
            media = window.matchMedia('(prefers-color-scheme: dark)')
            media.addListener(onThemeChange)
            onThemeChange()
        } else if (media) {
            media.removeListener(onThemeChange)
        }
    },
    { immediate: true }
)

function isNightTime(): boolean {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    return currentHour >= 20 || currentHour < 6
}

function isDarkMode(media: MediaQueryList): boolean {
    const prefersDarkMode = media!.matches

    return prefersDarkMode
}

function onThemeChange() {
    systemTheme.value = isDarkMode(media) ? 'dark' : 'light'
}

watchEffect(() => {
    switch (user.settings.theme) {
        case 'system':
            theme.global.name.value = systemTheme.value
            break
        case 'time':
            theme.global.name.value = isNightTime() ? 'dark' : 'light'
            break
        default:
            theme.global.name.value = user.settings.theme
    }
})

window.onbeforeunload = function () {
    if (!user.token) localStorage.setItem('settings', JSON.stringify(user.settings))
}
</script>

<style lang="sass"></style>
