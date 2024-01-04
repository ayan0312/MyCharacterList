<template>
    <app-link-list-item
        v-if="commits.latest"
        :href="`${GITHUB_REPO}/commit/${commits.latest?.sha}`"
        :title="commits.latest?.sha.slice(0, 7)"
        :label="t('latest-commit')"
        append-icon="mdi-open-in-new"
        prepend-icon="mdi-source-commit"
        rel="noopener noreferrer"
        target="_blank"
        min-width="90"
    />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCommitsStore } from 'src/stores/commits'

const commits = useCommitsStore()
const { t } = useI18n()
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPOSITORY_URL

onBeforeMount(() => {
    if (!commits.latest) commits.fetch()
})
</script>
