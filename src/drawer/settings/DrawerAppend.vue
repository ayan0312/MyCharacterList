<template>
    <div>
        <v-divider />
        <latest-release />
        <latest-commit />
        <latest-documentation />
    </div>
</template>

<script setup lang="ts">
// Components
import LatestCommit from './append/LatestCommit.vue'
import LatestRelease from './append/LatestRelease.vue'
import LatestDocumentation from './append/LatestDocumentation.vue'
</script>
