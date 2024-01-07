import { ParticipantManager } from './participant'

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

class TournamentBasis<T extends TournamentOptionsBasis = TournamentOptionsBasis> {
    public name: string
    public description?: string

    public readonly options: T

    constructor(options: T) {
        this.name = options.name
        this.options = options
        this.description = options.description
    }
}

export class SingleEliminationTournament extends TournamentBasis<SingleEliminationTournamentOptions> {
    constructor(options: SingleEliminationTournamentOptions) {
        super(options)
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

export class DoubleEliminationTournament extends TournamentBasis<DoubleEliminationTournamentOptions> {
    constructor(options: DoubleEliminationTournamentOptions) {
        super(options)
    }
}

export type SingleStageTournamentOptions =
    | SingleEliminationTournamentOptions
    | DoubleEliminationTournamentOptions

export function createSingleStageTournament(
    options: SingleEliminationTournamentOptions
): SingleEliminationTournament
export function createSingleStageTournament(
    options: DoubleEliminationTournamentOptions
): DoubleEliminationTournament
export function createSingleStageTournament(options: SingleStageTournamentOptions) {
    switch (options.format) {
        case 'single elimination':
            return new SingleEliminationTournament(options)
        case 'double elimination':
            return new DoubleEliminationTournament(options)
    }
}

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
