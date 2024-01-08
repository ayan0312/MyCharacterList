import * as PIXI from 'pixi.js'
import type { TournamentMatch } from './tournament'

export class Editor {
    public readonly app: PIXI.Application<PIXI.ICanvas>
    constructor(app: PIXI.Application<PIXI.ICanvas>) {
        this.app = app
    }

    private createMatchBlock(x: number, y: number) {
        const circle = new PIXI.Graphics()
        circle.beginFill(0x000000)
        circle.drawCircle(0, 0, 20)
        circle.endFill()
        circle.x = x
        circle.y = y
        return circle
    }

    private createTextBlock(match: TournamentMatch, x: number, y: number) {
        const text = new PIXI.Text(
            `${match?.left?.properties.id || ''} v ${match?.right?.properties.id || ''}`,
            {
                fontSize: 12,
                fill: 0xffffff
            }
        )
        text.x = x - text.width / 2
        text.y = y - text.height / 2
        return text
    }

    public draw(match: TournamentMatch | null, x: number, y: number, level: number = 1) {
        if (!match) return
        const circle = this.createMatchBlock(x, y)
        const text = this.createTextBlock(match, x, y)
        const offsetX = 150 / level
        if (match.prevLeft) {
            const leftX = x - offsetX
            const leftY = y + 50
            this.app.stage.addChild(
                new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(leftX, leftY)
            )
            this.draw(match.prevLeft, leftX, leftY, level * 2)
        }

        if (match.prevRight) {
            const rightX = x + offsetX
            const rightY = y + 50
            this.app.stage.addChild(
                new PIXI.Graphics().lineStyle(2, 0x000000).moveTo(x, y).lineTo(rightX, rightY)
            )
            this.draw(match.prevRight, rightX, rightY, level * 2)
        }

        this.app.stage.addChild(circle)
        this.app.stage.addChild(text)
    }
}
