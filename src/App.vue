<template>
    <v-app>
        <app-bar />
        <app-menu-drawer />
        <app-settings-drawer />
        <v-main class="text-center font-weight-light"> content </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useTheme } from 'vuetify'

import AppBar from 'src/components/bar/Bar.vue'
import AppMenuDrawer from 'src/drawer/menu/Menu.vue'
import AppSettingsDrawer from 'src/drawer/settings/Settings.vue'

import { useUserStore } from './stores/user'

const user = useUserStore()
const theme = useTheme()
const systemTheme = ref('light')

let media: MediaQueryList
let timer: number

watch(
    () => user.settings.theme,
    (val) => {
        if (val === 'system') {
            media = window.matchMedia('(prefers-color-scheme: dark)')
            media.addListener(onThemeChange)
            onThemeChange()
        } else if (media) media.removeListener(onThemeChange)

        if (val === 'time') {
            timer = setInterval(onTimeChange, 5 * 60 * 1000)
            onTimeChange()
        } else if (timer) clearInterval(timer)
    },
    { immediate: true }
)

function onTimeChange() {
    systemTheme.value = isNightTime() ? 'dark' : 'light'
}

function onThemeChange() {
    systemTheme.value = isDarkMode(media) ? 'dark' : 'light'
}

function isDarkMode(media: MediaQueryList): boolean {
    const prefersDarkMode = media.matches
    return prefersDarkMode
}

function isNightTime(): boolean {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    return currentHour >= 20 || currentHour < 6
}

watchEffect(() => {
    switch (user.settings.theme) {
        case 'time':
        case 'system':
            theme.global.name.value = systemTheme.value
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
