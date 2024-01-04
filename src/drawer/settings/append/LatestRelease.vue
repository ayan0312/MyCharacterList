<template>
    <app-link-list-item
        :title="version"
        :label="t('latest-release')"
        append-icon="mdi-page-next"
        prepend-icon="mdi-tag-outline"
        @click="onClick"
    />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from 'src/stores/app'

const app = useAppStore()
const { t } = useI18n()
const version = import.meta.env.VITE_VERSION

function onClick() {
    app.drawer.settings = false
}
</script>
