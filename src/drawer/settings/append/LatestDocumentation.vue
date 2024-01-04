<template>
    <app-link-list-item
        v-if="commits.latest"
        :append-icon="appendIcon"
        :href="`${GITHUB_REPO}/tree/${commits.latest?.sha}`"
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
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPOSITORY_URL

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
