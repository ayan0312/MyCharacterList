import * as PIXI from 'pixi.js'
import type { HuffmanNode } from './huffman'

export function drawBinaryTree(
    app: PIXI.Application<PIXI.ICanvas>,
    node: HuffmanNode | null,
    x: number,
    y: number,
    level: number = 1
) {
    if (!node) return
    const circle = new PIXI.Graphics()
    circle.beginFill(0x000000)
    circle.drawCircle(0, 0, 10)
    circle.endFill()
    circle.x = x
    circle.y = y

    const text = new PIXI.Text(`${node.value}`, { fontSize: 12, fill: 0xffffff })
    text.x = x - text.width / 2
    text.y = y - text.height / 2

    const offsetX = 150 / level

    if (node.left !== null) {
        const leftX = x - offsetX
        const leftY = y + 50
        app.stage.addChild(
            new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(leftX, leftY)
        )
        drawBinaryTree(app, node.left, leftX, leftY, level * 2)
    }

    if (node.right !== null) {
        const rightX = x + offsetX
        const rightY = y + 50
        app.stage.addChild(
            new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(rightX, rightY)
        )
        drawBinaryTree(app, node.right, rightX, rightY, level * 2)
    }

    app.stage.addChild(circle)
    app.stage.addChild(text)
}

export class Editor {
    public readonly app: PIXI.Application<PIXI.ICanvas>
    constructor(app: PIXI.Application<PIXI.ICanvas>) {
        this.app = app
    }

    public draw() {}
}
