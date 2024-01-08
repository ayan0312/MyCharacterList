import * as PIXI from 'pixi.js'

import { HuffmanNode, buildHuffmanTree } from './huffman'
import type { Participant, ParticipantManager } from './participant'

export class Bracket {
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

    private createTextBlock(match: BracketMatch, x: number, y: number) {
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

    public draw(match: BracketMatch | null, x: number, y: number, level: number = 1) {
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

    public drawTournament(manager: ParticipantManager) {
        //  this.draw(tournament.rootMatch, this.app.renderer.width / 2.5, 50)
    }
}

export interface BracketRound {
    label: string
    matches: BracketMatch[]
}

export class BracketMatch {
    public left?: Participant
    public right?: Participant
    public winner?: Participant

    public next?: BracketMatch
    public prevLeft?: BracketMatch
    public prevRight?: BracketMatch

    constructor(left?: Participant, right?: Participant) {
        if (left) this.left = left
        if (right) this.right = right
    }

    public setWinner(type: 'left' | 'right') {
        if (!this.activated) return
        if (type === 'left') this.winner = this.left
        else this.winner = this.right
    }

    public get activated() {
        if (this.winner) return false
        if (this.prevLeft && !this.prevLeft.winner) return false
        if (this.prevRight && !this.prevRight.winner) return false
        if (!this.left) return false
        if (!this.right) return false
        return true
    }

    public isLeafMatch() {
        return !this.left && !this.right
    }

    public static createRounds(match: BracketMatch) {
        const rounds: BracketRound[] = []
        let currentRound: BracketRound = {
            label: 'Round 1',
            matches: []
        }
        let currentMatch = match
        let currentRoundMatches: BracketMatch[] = []
        while (currentMatch) {
            if (currentMatch.isLeafMatch()) {
                currentRoundMatches.push(currentMatch)
                currentRound.matches = currentRoundMatches
                rounds.push(currentRound)
                break
            }
            if (currentMatch.activated) {
                currentRoundMatches.push(currentMatch)
                currentMatch = currentMatch.next!
            } else {
                currentRound.matches = currentRoundMatches
                rounds.push(currentRound)
                currentRound = {
                    label: `Round ${rounds.length + 1}`,
                    matches: []
                }
                currentRoundMatches = []
                currentMatch = currentMatch.next!
            }
        }
        return rounds
    }

    public static transform(huffmanTree?: HuffmanNode<Participant>) {
        const root = new BracketMatch()
        if (!huffmanTree) return root
        const queue: BracketMatch[] = [root]
        const huffmanQueue: HuffmanNode<Participant>[] = [huffmanTree]

        while (huffmanQueue.length) {
            const rootMatch = queue.shift()!
            const huffmanNode = huffmanQueue.shift()!
            const leftHuffman = huffmanNode.left
            const rightHuffman = huffmanNode.right

            if (leftHuffman) {
                if (leftHuffman.isLeafNode()) {
                    rootMatch.left = leftHuffman.value
                } else {
                    const leftMatch = new BracketMatch()
                    rootMatch.prevLeft = leftMatch
                    leftMatch.next = rootMatch
                    queue.push(leftMatch)
                    huffmanQueue.push(leftHuffman)
                }
            }

            if (rightHuffman) {
                if (rightHuffman.isLeafNode()) {
                    rootMatch.right = rightHuffman.value
                } else {
                    const rightMatch = new BracketMatch()
                    rootMatch.prevRight = rightMatch
                    rightMatch.next = rootMatch
                    queue.push(rightMatch)
                    huffmanQueue.push(rightHuffman)
                }
            }
        }
        return root
    }
}

export class SingleEliminationBracket {
    public match: BracketMatch
    public rounds: BracketRound[]

    constructor(participants: Participant[]) {
        this.match = BracketMatch.transform(buildHuffmanTree(participants))
        this.rounds = BracketMatch.createRounds(this.match)
    }
}

export interface DoubleEliminationBracketOptions {
    /**
     * 1-2 matches — winners bracket finalist has to be defeated twice by the losers bracket finalist
     */
    grandFinal?: 'none' | '1 match' | '1-2 matches'
    /**
     * Host a single stage double elimination tournament with participants starting in the losers bracket.
     * The bottom half of your participants will then start in the losers bracket.
     *
     */
    startWithHalfLoser?: boolean
}

export class DoubleEliminationBracket {
    constructor(participants: Participant[], options: DoubleEliminationBracketOptions) {}
}
