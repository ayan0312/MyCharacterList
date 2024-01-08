import { HuffmanNode, buildHuffmanTree, levelOrderTraversal } from './huffman'
import { Participant } from './participant'

interface TournamentOptionsBasis {
    /**
     * The name of the tournament.
     */
    name: string
    /**
     * An optional description of the tournament.
     */
    description?: string
}

interface SingleStageTournamentOptionsBasis extends TournamentOptionsBasis {
    type: 'single stage'
}

export interface SingleEliminationTournamentOptions extends SingleStageTournamentOptionsBasis {
    format: 'single elimination'
}

abstract class TournamentBasis<Options extends TournamentOptionsBasis> {
    public name: string
    public description = ''

    public readonly options: Options
    public readonly rounds: { label: string; matches: TournamentMatch[] }[] = []

    constructor(options: Options) {
        this.name = options.name
        this.options = options

        if (options.description) this.description = options.description
    }
}

export class TournamentMatch {
    public left?: Participant
    public right?: Participant
    public winner?: Participant

    public next?: TournamentMatch
    public prevLeft?: TournamentMatch
    public prevRight?: TournamentMatch

    constructor(left?: Participant, right?: Participant) {
        if (left) this.left = left
        if (right) this.right = right
    }

    public setWinner(type: 'left' | 'right') {
        if (this.winner) throw new Error('Winner has already been set.')
        if (this.prevLeft && !this.prevLeft.winner)
            throw new Error('Previous left winner has not been set.')
        if (this.prevRight && !this.prevRight.winner)
            throw new Error('Previous right winner has not been set.')
        if (!this.left) throw new Error('Left participant has not been set.')
        if (!this.right) throw new Error('Right participant has not been set.')

        if (type === 'left') this.winner = this.left
        else this.winner = this.right
    }

    public isLeafMatch() {
        return !this.left && !this.right
    }

    public static transform(huffmanTree: HuffmanNode<Participant>) {
        const root = new TournamentMatch()
        const queue: TournamentMatch[] = [root]
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
                    const leftMatch = new TournamentMatch()
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
                    const rightMatch = new TournamentMatch()
                    rootMatch.prevRight = rightMatch
                    rightMatch.next = rootMatch
                    queue.push(rightMatch)
                    huffmanQueue.push(rightHuffman)
                }
            }
        }
        console.log(root)
        return root
    }
}

export class SingleEliminationTournament extends TournamentBasis<TournamentOptions> {
    public rootMatch: TournamentMatch

    constructor(options: TournamentOptions) {
        super(options)
        this.rootMatch = new TournamentMatch()
    }

    public generateMatches(participants: Participant[]) {
        return TournamentMatch.transform(buildHuffmanTree(participants.reverse()))
    }
}

export interface DoubleEliminationTournamentOptions extends SingleStageTournamentOptionsBasis {
    format: 'double elimination'
    /**
     * Host a single stage double elimination tournament with participants starting in the losers bracket.
     * The bottom half of your participants will then start in the losers bracket.
     *
     */
    startWithHalfLoser?: boolean
    /**
     * 1-2 matches — winners bracket finalist has to be defeated twice by the losers bracket finalist
     */
    grandFinal?: 'none' | '1 match' | '1-2 matches'
}

export class DoubleEliminationTournament extends TournamentBasis<DoubleEliminationTournamentOptions> {
    constructor(options: DoubleEliminationTournamentOptions) {
        super(options)
    }
}

export type SingleStageTournamentOptions =
    | SingleEliminationTournamentOptions
    | DoubleEliminationTournamentOptions

/**
 * groups compete separately, winners proceed to a final stage (e.g. World Cup)
 */
export interface TwoStageTournamentOptions extends TournamentOptionsBasis {
    type: 'two stage'
    groupStage: SingleStageTournamentOptions // The format of the group stage.
    finalStage: SingleStageTournamentOptions // The format of the final stage.
    participant: {
        total?: number // The total number of participants in the tournament.
        group: {
            total: number // The total number of groups in the group stage.
            advancing: number // The number of participants advancing from each group.
        }
    }
}

export type TournamentOptions = SingleStageTournamentOptions | TwoStageTournamentOptions

export function createTournament(
    options: SingleEliminationTournamentOptions
): SingleEliminationTournament
export function createTournament(
    options: DoubleEliminationTournamentOptions
): DoubleEliminationTournament
export function createTournament(options: TournamentOptions) {
    if (options.type == 'single stage')
        switch (options.format) {
            case 'single elimination':
                return new SingleEliminationTournament(options)
            case 'double elimination':
                return new DoubleEliminationTournament(options)
        }
}
