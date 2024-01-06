<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as PIXI from 'pixi.js'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    onMounted(() => {
        if (canvas.value) {
            // Create a PixiJS application
            const app = new PIXI.Application({
                view: canvas.value,
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0xaaaaaa
            })

            const graphics = new PIXI.Graphics()
            graphics.beginFill(0xff0000)
            graphics.drawRect(0, 0, 100, 100)
            graphics.endFill()

            app.stage.addChild(graphics)
        }
    })
})
</script>

<style scoped></style>
