<template>
    <v-app-bar id="app-bar" :image="image" border="b" flat>
        <template #prepend>
            <app-bar-logo />
            <app-vertical-divider v-if="lgAndUp" class="ms-3 me-2" />
            <app-btn v-if="mdAndDown" icon="mdi-menu" @click="app.drawer.menu = !app.drawer.menu" />
            <app-search />
        </template>

        <template #append>
            <template v-if="mdAndUp"></template>

            <template v-if="!user.settings.quickbar">
                <app-vertical-divider v-if="smAndUp" class="ms-3 me-2" />
                <app-bar-notifications-menu />
                <app-bar-language-menu v-if="smAndUp" />
                <app-bar-settings-toggle />
            </template>

            <app-vertical-divider v-if="lgAndUp" class="ms-2 me-3" />
            <app-bar-login />
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'

import AppSearch from 'src/components/search/Search.vue'
import AppBarLogo from './Logo.vue'
import AppBarLogin from './Login.vue'
import AppBarLanguageMenu from './LanguageMenu.vue'
import AppBarSettingsToggle from './SettingsToggle.vue'
import AppBarNotificationsMenu from './NotificationsMenu.vue'

import { useAppStore } from 'src/stores/app'
import { useUserStore } from 'src/stores/user'

const app = useAppStore()
const user = useUserStore()
const theme = useTheme()
const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()

const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined
    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-bar.png`
})
</script>
src/stores/user
