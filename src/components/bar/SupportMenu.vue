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
        title: 'faq',
        appendIcon: 'mdi-head-question-outline'
    },
    {
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
        title: 'check-for-updates',
        appendIcon: 'mdi-update'
    },
    { divider: true },
    {
        title: 'about',
        appendIcon: 'mdi-information-outline'
    }
])
</script>
