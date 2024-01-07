<template>
    <v-app-bar id="app-bar" :image="image" border="b" flat>
        <template #prepend>
            <app-logo />
            <app-vertical-divider v-if="lgAndUp" class="ms-3 me-2" />
            <app-btn v-if="mdAndDown" icon="mdi-menu" @click="app.drawer.menu = !app.drawer.menu" />
            <app-search />
        </template>
        <template #append>
            <template v-if="mdAndUp">
                <app-bar-support-menu />
            </template>
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
import { useDisplay } from 'vuetify'

import AppSearch from 'src/components/search/Search.vue'
import AppLogo from 'src/components/icons/Logo.vue'
import AppBarLogin from './Login.vue'
import AppBarSupportMenu from './SupportMenu.vue'
import AppBarLanguageMenu from './LanguageMenu.vue'
import AppBarSettingsToggle from './SettingsToggle.vue'
import AppBarNotificationsMenu from './NotificationsMenu.vue'

import { useAppStore } from 'src/stores/app'
import { useUserStore } from 'src/stores/user'
import { useThemeImage } from 'src/vuetify/themes'

const app = useAppStore()
const user = useUserStore()
const { image } = useThemeImage('nav')
const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()
</script>
