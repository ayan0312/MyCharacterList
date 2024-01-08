import { buildHuffmanTree } from './huffman'
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

interface SingleEliminationTournamentOptions extends SingleStageTournamentOptionsBasis {
    format: 'single elimination'
}

abstract class TournamentBasis<
    Round extends TournamentRound<Round>,
    Options extends TournamentOptionsBasis
> {
    public name: string
    public rounds: Round | null = null
    public description = ''

    public readonly options: Options

    constructor(options: Options) {
        this.name = options.name
        this.options = options

        if (options.description) this.description = options.description
    }
}

abstract class TournamentRound<R extends TournamentRound<R>> {
    public winner: Participant | null = null

    public left: Participant | null = null
    public right: Participant | null = null

    public next: TournamentRound<R> | null = null
    public prevLeft: TournamentRound<R> | null = null
    public prevRight: TournamentRound<R> | null = null

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
}

export class SingleEliminationTournament extends TournamentBasis<
    SingleEliminationTournamentRound,
    SingleEliminationTournamentOptions
> {
    public rootRound: SingleEliminationTournamentRound
    constructor(options: SingleEliminationTournamentOptions) {
        super(options)
        this.rootRound = new SingleEliminationTournamentRound()
    }

    public buildRoundTree(participants: Participant[]) {
        return buildHuffmanTree(
            participants.reverse().map((p) => p.name),
            participants.map(() => 1)
        )
    }
}

export class SingleEliminationTournamentRound extends TournamentRound<SingleEliminationTournamentRound> {
    constructor(left?: Participant, right?: Participant) {
        super(left, right)
    }
}

interface DoubleEliminationTournamentOptions extends SingleStageTournamentOptionsBasis {
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

export class DoubleEliminationTournament extends TournamentBasis<
    DoubleEliminationTournamentRound,
    DoubleEliminationTournamentOptions
> {
    constructor(options: DoubleEliminationTournamentOptions) {
        super(options)
    }
}

export class DoubleEliminationTournamentRound extends TournamentRound<DoubleEliminationTournamentRound> {
    constructor(left: Participant, right: Participant) {
        super(left, right)
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
    return null
}
