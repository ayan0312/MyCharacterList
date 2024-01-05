<template>
    <app-menu key="language-menu" :open-on-hover="false" :items="items">
        <template #activator="{ props }">
            <app-btn color="medium-emphasis" icon="mdi-translate" v-bind="props" />
        </template>
    </app-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import locales from 'src/i18n/locales'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()

const items = computed(() => [
    ...locales.map((locale) => {
        return {
            title: locale.title,
            disabled: !locale.enabled,
            onClick: () => {
                userStore.setLocale(locale.locale)
            }
        }
    }),
    { title: 'more-coming-soon', disabled: true }
])
</script>
