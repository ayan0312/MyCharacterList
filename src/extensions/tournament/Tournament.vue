<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as PIXI from 'pixi.js'
import { BinaryTree, drawBinaryTree } from './editor'
import { useTheme } from 'vuetify'
import { watchEffect } from 'vue'
import { searchChars } from 'src/apis/character'
import { useAxiosErrorHandler } from 'src/shared/https'

let app: PIXI.Application<PIXI.ICanvas> | null = null
const theme = useTheme()
const canvas = ref<HTMLCanvasElement | null>(null)

searchChars({
    page: 1,
    size: 10,
    orderBy: {
        sort: 'created',
        order: 'DESC'
    }
})
    .then(({ data }) => {
        if (!data.success) return
        console.log(data.result)
    })
    .catch(useAxiosErrorHandler())

watchEffect(() => {
    const colors = theme.current.value.colors
    if (app) app.renderer.background.color = colors.background
})

onMounted(() => {
    if (canvas.value) {
        const parent = canvas.value.parentElement || canvas.value
        app = new PIXI.Application({
            view: canvas.value,
            resizeTo: parent,
            background: theme.current.value.colors.background
        })

        const binaryTree = new BinaryTree()
        binaryTree.insert(8)
        binaryTree.insert(3)

        if (binaryTree.root !== null)
            drawBinaryTree(app, binaryTree.root, app.renderer.width / 2.5, 50)
    }
})
</script>

<style scoped lang="sass"></style>
