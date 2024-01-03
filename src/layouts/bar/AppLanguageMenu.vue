<template>
    <app-menu key="language-menu" :open-on-hover="false" :items="items">
        <template #activator="{ props }">
            <app-btn color="medium-emphasis" icon="mdi-translate" v-bind="props" />
        </template>
    </app-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import locales from 'src/i18n/locales'
import { useUserStore } from 'src/stores/user'

const { t } = useI18n()
const userStore = useUserStore()

const items = computed(() => [
    { subheader: t('translations') },
    ...locales.map((locale) => {
        return {
            title: locale.title,
            disabled: !locale.enabled,
            onClick: () => {
                userStore.setLocale(locale.locale)
            }
        }
    }),
    { title: t('more-coming-soon'), disabled: true }
])
</script>
