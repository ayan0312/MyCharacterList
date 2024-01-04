<template>
    <v-app>
        <app-settings-drawer />
        <app-bar />
        <v-main class="text-center font-weight-light"> content </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Components
import AppBar from 'src/components/bar/Bar.vue'
import AppSettingsDrawer from 'src/drawer/Settings.vue'
</script>

<style lang="sass"></style>
