<template>
    <v-img
        :key="logo"
        alt="MyCharacterList"
        :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
        :width="lgAndUp ? 148 : 34"
        class="shrink"
        :transition="false"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'

defineProps({
    alt: Boolean
})

const { lgAndUp } = useDisplay()
const theme = useTheme()

const logo = computed(() => {
    const file = `${theme.name.value}.svg`
    const logo = 'vuetify-logo-v3-slim'

    return `${logo}-${lgAndUp.value ? 'text-' : ''}${file}`
})
</script>
