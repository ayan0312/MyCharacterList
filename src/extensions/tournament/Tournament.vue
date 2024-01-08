<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, watchEffect, shallowRef, onMounted } from 'vue'
import * as PIXI from 'pixi.js'
import { useTheme } from 'vuetify'

import { CharacterService } from 'src/apis/character'
import { useAxiosErrorHandler } from 'src/shared/https'
import type { ICharacterPatchedResult } from 'src/apis/interface/character.interface'

import { Bracket } from './bracket'
import { ParticipantManager } from './participant'

const app = shallowRef<PIXI.Application | null>(null)
const theme = useTheme()
const canvas = ref<HTMLCanvasElement | null>(null)
const characters = shallowRef<ICharacterPatchedResult[] | null>(null)

CharacterService.search({
    page: 1,
    size: 13,
    orderBy: {
        sort: 'created',
        order: 'ASC'
    }
})
    .then(({ data }) => {
        if (!data.success) return
        characters.value = data.result.rows
    })
    .catch(useAxiosErrorHandler())

onMounted(() => {
    if (!canvas.value) return
    const parent = canvas.value.parentElement || canvas.value
    app.value = new PIXI.Application({
        view: canvas.value,
        resizeTo: parent,
        background: theme.current.value.colors.background
    })
})

watchEffect(() => {
    const themeBackground = theme.current.value.colors.background
    if (app.value) {
        const appBackground = app.value.renderer.background.color
        if (appBackground != themeBackground) app.value.renderer.background.color = themeBackground
    }
})

watchEffect(() => {
    if (app.value && canvas.value && characters.value) {
        const manager = new ParticipantManager()
        const bracket = new Bracket(app.value)
        characters.value.forEach((char) =>
            manager.add({
                name: char.name,
                avatar: char.xs.avatar,
                properties: char
            })
        )

        bracket.drawTournament(manager)
    }
})
</script>

<style scoped lang="sass"></style>
./bracket
