<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as PIXI from 'pixi.js'
import { BinaryTree, drawBinaryTree } from './editor'
import { useTheme } from 'vuetify'
import { watchEffect } from 'vue'

let app: PIXI.Application<PIXI.ICanvas> | null = null
const theme = useTheme()
const canvas = ref<HTMLCanvasElement | null>(null)

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
        binaryTree.insert(10)
        binaryTree.insert(1)
        binaryTree.insert(6)
        binaryTree.insert(14)
        binaryTree.insert(4)
        binaryTree.insert(7)
        binaryTree.insert(13)

        if (binaryTree.root !== null)
            drawBinaryTree(app, binaryTree.root, app.renderer.width / 2.5, 50)
    }
})
</script>

<style scoped lang="sass"></style>
