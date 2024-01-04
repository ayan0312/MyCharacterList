<template>
    <v-dialog
        v-model="model"
        content-class="overflow-visible align-self-start mt-16"
        max-height="900"
        scrollable
        width="600"
        @after-leave="searchString = ''"
    >
        <template #activator="{ props: activatorProps }">
            <app-btn
                :active="model"
                :icon="xs ? 'mdi-magnify' : undefined"
                :prepend-icon="smAndUp ? 'mdi-magnify' : undefined"
                v-bind="activatorProps"
            >
                <span :class="mdAndUp && 'me-n1'">
                    <span v-if="smAndUp">
                        {{ t('search.label') }}
                    </span>

                    <span
                        :class="[
                            smAndDown ? 'border-opacity-0' : 'py-1 px-2 ms-2',
                            'border rounded text-disabled text-caption'
                        ]"
                    >
                        <span v-if="mdAndUp">
                            {{ t(`search.key-hint${platform.mac ? '-mac' : ''}`) }}
                        </span>
                    </span>
                </span>
            </app-btn>
        </template>

        <v-card>
            <app-text-field
                v-model="searchString"
                :placeholder="`${t('search.looking')}...`"
                autofocus
                class="flex-grow-0 mb-4"
                variant="filled"
            >
                <template #append-inner>
                    <app-btn border size="small">
                        <span class="text-caption text-disabled">{{ t('esc') }}</span>
                    </app-btn>
                </template>
            </app-text-field>
            <v-card-text
                :class="[
                    'px-4 py-0 d-flex flex-wrap justify-center',
                    searchString ? 'align-start' : 'align-center'
                ]"
            >
                <search-recent
                    v-if="searches.length && !searchString"
                    :searches="searches"
                    @click:delete="onClickDelete"
                />

                <template v-else-if="!searchString">
                    <div class="text-center">
                        <v-icon
                            class="mb-6 mx-auto text-disabled"
                            icon="mdi-text-box-search-outline"
                            size="150"
                        />

                        <br />

                        <v-list-subheader class="d-inline-flex">
                            {{ t('search.results') }}
                        </v-list-subheader>
                    </div>
                </template>
            </v-card-text>

            <v-divider class="my-4" />
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

import SearchRecent from './SearchRecent.vue'

const { t } = useI18n()
const { smAndUp, smAndDown, mdAndUp, xs, platform } = useDisplay()

const model = ref(false)
const searchString = ref('')
const searches = ref(JSON.parse(localStorage.getItem('searches') || '[]'))

watch(searches, (val) => {
    localStorage.setItem('searches', JSON.stringify(val))
})

onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
})

function onDocumentKeydown(e: KeyboardEvent) {
    const modifierKey = platform.value.mac ? e.metaKey : e.ctrlKey
    const isSearchKey = modifierKey && e.key === 'k'

    if (!model.value && isSearchKey) {
        e.preventDefault()
        model.value = true
    } else if (model.value && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        // TODO: focus first item
    }
}

function onClickDelete(index: number) {
    const array = searches.value.slice(0, 6)
    array.splice(index, 1)
    searches.value = array
}
</script>

<style scoped>
:deep(.v-field--variant-solo) {
    box-shadow: none;
}
</style>
