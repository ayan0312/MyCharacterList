<template>
    <app-btn
        id="settings-toggle"
        :icon="app.drawer.settings ? 'mdi-cog' : 'mdi-cog-outline'"
        color="medium-emphasis"
        @click="onClick"
    />
</template>

<script setup lang="ts">
import { useAppStore } from 'src/stores/app'

const app = useAppStore()

function onClick() {
    app.drawer.settings = !app.drawer.settings
}
</script>
