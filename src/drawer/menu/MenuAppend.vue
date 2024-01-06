<template>
    <v-divider />
    <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
        <div class="d-flex ms-auto overflow-hidden">
            <v-btn
                :text="version"
                class="text-caption"
                prepend-icon="mdi-tag-outline"
                size="small"
                slim
                variant="text"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
const version = import.meta.env.VITE_VERSION
</script>
