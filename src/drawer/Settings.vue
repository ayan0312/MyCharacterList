<template>
    <v-navigation-drawer
        id="settings-drawer"
        v-model="app.drawer.settings"
        :location="isRtl ? 'left' : 'right'"
        disable-route-watcher
        temporary
        touchless
        width="350"
    >
        <v-toolbar :title="t('settings')" flat>
            <template #append>
                <v-btn icon="mdi-close" variant="flat" @click="app.drawer.settings = false" />
            </template>
        </v-toolbar>

        <v-divider />

        <v-container class="px-3 py-3">
            <settings-drawer-options />
        </v-container>

        <template #append>
            <settings-drawer-append />
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRtl } from 'vuetify'
import { useI18n } from 'vue-i18n'

import SettingsDrawerAppend from './settings/DrawerAppend.vue'
import SettingsDrawerOptions from './settings/DrawerOptions.vue'

import { useAppStore } from 'src/stores/app'

const app = useAppStore()

const { t } = useI18n()
const { isRtl } = useRtl()
</script>
