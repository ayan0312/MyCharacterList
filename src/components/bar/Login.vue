<template>
    <app-btn
        v-bind="{
            [`${lgAndUp ? 'append-' : ''}icon`]: 'mdi-login'
        }"
        :text="lgAndUp ? 'login.login' : undefined"
        :rounded="mdAndDown"
        class="ms-1"
        color="primary"
        variant="outlined"
    >
        <v-dialog activator="parent" max-width="480">
            <v-card class="pt-6 pb-1 pb-sm-4 px-4 px-sm-8">
                <v-img
                    :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-${theme.name.value}.svg`"
                    class="mb-4"
                    height="30"
                />
                <div class="text-center mb-6">
                    <v-card-title class="text-h5 mb-1 text-md-h4 font-weight-bold">
                        {{ t('login.title') }}
                    </v-card-title>
                    <v-card-subtitle class="text-wrap">{{ t('login.subtitle') }}</v-card-subtitle>
                </div>
                <v-list class="mx-auto" max-width="300" width="100%"> </v-list>
            </v-card>
        </v-dialog>
    </app-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDisplay, useTheme } from 'vuetify'

const { mdAndDown, lgAndUp } = useDisplay()
const theme = useTheme()
const { t } = useI18n()
</script>

<style lang="sass">
#login-btn
  .v-skeleton-loader__avatar
    min-height: 40px
    height: 40px
    width: 40px
    max-height: 40px
    min-width: 40px
    max-width: 40px
</style>
