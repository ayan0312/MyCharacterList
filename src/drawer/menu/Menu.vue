<template>
    <v-navigation-drawer
        id="app-drawer"
        v-model="app.drawer.menu"
        :image="image"
        :order="mobile ? -1 : undefined"
        width="300"
    >
        <app-list :items="app.items" nav>
            <template #divider>
                <v-divider class="my-3 mb-4 ms-10" />
            </template>
        </app-list>
        <template #append>
            <menu-append />
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

import MenuAppend from './MenuAppend.vue'

import { useThemeImage } from 'src/themes'
import { useAppStore } from 'src/stores/app'

const app = useAppStore()
const { mobile } = useDisplay()
const { image } = useThemeImage('menu')
</script>
