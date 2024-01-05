<template>
    <v-snackbar
        v-if="isVisible && current"
        v-model="isActive"
        :timeout="current.timeout"
        timer
        :color="current.color"
        @after-leave="onAfterLeave"
    >
        {{ current.message }}
    </v-snackbar>
</template>

<script setup lang="ts">
import { nextTick, ref, shallowRef, watch } from 'vue'
import { type Notification, useAppStore } from 'src/stores/app'

const app = useAppStore()
const isActive = ref(false)
const isVisible = ref(false)
const current = shallowRef<Notification>()

watch(
    () => app.notifications.length,
    (val, oldVal) => {
        if (!isVisible.value && val > oldVal) showNext()
    }
)

watch(isActive, (val) => {
    if (val) isVisible.value = true
})

function onAfterLeave() {
    if (app.notifications.length) {
        showNext()
    } else {
        current.value = undefined
        isVisible.value = false
    }
}

function showNext() {
    current.value = app.notifications[0]
    app.notifications.splice(0, 1)
    nextTick(() => {
        isActive.value = true
    })
}
</script>
