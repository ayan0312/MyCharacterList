<template>
    <app-link-list-item
        href="https://theme-generator.vuetifyjs.com/"
        :title="t('open')"
        :label="t('theme-generator')"
        append-icon="mdi-open-in-new"
        prepend-icon="mdi-format-color-fill"
        rel="noopener noreferrer"
        target="_blank"
        min-width="90"
    />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
