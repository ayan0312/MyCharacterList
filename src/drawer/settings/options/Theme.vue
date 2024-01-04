<template>
    <v-radio-group
        v-model="user.settings.theme"
        class="mb-2"
        color="primary"
        hide-details
        true-icon="mdi-check-circle-outline"
    >
        <v-radio v-for="(item, i) in items" :key="i" :value="item.value">
            <template #label>
                <v-icon :icon="item.icon" start />

                {{ t(item.text) }}
            </template>
        </v-radio>
    </v-radio-group>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'src/stores/user'

const { t } = useI18n()
const user = useUserStore()

const items = [
    {
        text: 'themes.light',
        icon: 'mdi-white-balance-sunny',
        value: 'light'
    },
    {
        text: 'themes.dark',
        icon: 'mdi-weather-night',
        value: 'dark'
    },
    {
        text: 'themes.system',
        icon: 'mdi-desktop-tower-monitor',
        value: 'system'
    },
    {
        text: 'themes.blackguard',
        icon: 'mdi-space-invaders',
        value: 'blackguard'
    }
]
</script>
