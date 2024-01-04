<template>
    <app-link-list-item
        v-if="commits.latest"
        :append-icon="appendIcon"
        :href="`https://github.com/ayan0312/MyCharacterList/tree/${commits.latest?.sha}`"
        :title="commits.latest?.sha.slice(0, 7)"
        :label="t('latest-documentation')"
        :prepend-icon="prependIcon"
        rel="noopener noreferrer"
        target="_blank"
    />
</template>

<script setup lang="ts">
// Composables
import { useI18n } from 'vue-i18n'

import { useCommitsStore } from 'src/stores/commits'

const commits = useCommitsStore()
const { t } = useI18n()

defineProps({
    prependIcon: {
        type: String,
        default: 'mdi-package'
    },
    appendIcon: {
        type: String,
        default: 'mdi-open-in-new'
    }
})
</script>
