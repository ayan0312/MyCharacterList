import * as PIXI from 'pixi.js'

class TreeNode {
    value: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(value: number) {
        this.value = value
        this.left = null
        this.right = null
    }
}

export class BinaryTree {
    root: TreeNode | null

    constructor() {
        this.root = null
    }

    insert(value: number) {
        const newNode = new TreeNode(value)
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node: TreeNode, newNode: TreeNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
}

export function drawBinaryTree(
    app: PIXI.Application<PIXI.ICanvas>,
    node: TreeNode | null,
    x: number,
    y: number,
    level: number = 1
) {
    if (node !== null) {
        const circle = new PIXI.Graphics()
        circle.beginFill(0xffffff)
        circle.drawCircle(0, 0, 20)
        circle.endFill()
        circle.x = x
        circle.y = y
        app.stage.addChild(circle)

        const text = new PIXI.Text(`${node.value}`, { fontSize: 12, fill: 0x000000 })
        text.x = x - text.width / 2
        text.y = y - text.height / 2
        app.stage.addChild(text)

        const offsetX = 50 / level

        if (node.left !== null) {
            const leftX = x - offsetX
            const leftY = y + 50
            app.stage.addChild(
                new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(leftX, leftY)
            )
            drawBinaryTree(app, node.left, leftX, leftY, level + 1)
        }

        if (node.right !== null) {
            const rightX = x + offsetX
            const rightY = y + 50
            app.stage.addChild(
                new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(rightX, rightY)
            )
            drawBinaryTree(app, node.right, rightX, rightY, level + 1)
        }
    }
}
