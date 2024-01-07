<template>
    <app-btn color="medium-emphasis" class="ms-1">
        {{ t('help') }}
        <chevron-down />
        <app-menu :items="items" activator="parent" width="220" />
    </app-btn>
</template>

<script setup lang="ts">
import ChevronDown from 'src/components/icons/ChevronDown.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const items = computed(() => [
    {
        to: '/faq',
        title: 'faq',
        appendIcon: 'mdi-head-question-outline'
    },
    {
        to: '/file-a-bug-report',
        title: 'file-a-bug-report',
        appendIcon: 'mdi-bug-outline'
    },
    { divider: true },
    {
        title: 'github-issues',
        href: `${import.meta.env.VITE_GITHUB_REPOSITORY_URL}/issues/`,
        appendIcon: 'mdi-message-text-outline'
    },
    { divider: true },
    {
        to: '/release-notes',
        title: 'release-notes',
        appendIcon: 'mdi-note-text-outline'
    },
    {
        to: '/check-for-updates',
        title: 'check-for-updates',
        appendIcon: 'mdi-update'
    },
    { divider: true },
    {
        to: '/about',
        title: 'about',
        appendIcon: 'mdi-information-outline'
    }
])
</script>
