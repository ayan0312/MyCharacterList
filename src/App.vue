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
function onThemeChange() {
    systemTheme.value = media!.matches ? 'dark' : 'light'
}

watchEffect(() => {
    theme.global.name.value =
        user.settings.theme === 'system' ? systemTheme.value : user.settings.theme
})
</script>

<style lang="sass"></style>
