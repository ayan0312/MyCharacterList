<template>
    <div>
        <settings-header title="theme" text="theme-message" />
        <theme-option />
        <settings-header title="custom-theme" text="more-coming-soon" />
        <v-divider class="mt-4 mb-3" />
        <settings-header title="general" text="general-message" />
    </div>
</template>

<script setup lang="ts">
import ThemeOption from './options/Theme.vue'
import SettingsHeader from './SettingsHeader.vue'
</script>
