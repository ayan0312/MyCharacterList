import type { DoubleEliminationBracketOptions } from './bracket'
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

export type SingleStageTournamentOptions = {
    type: 'single stage'
} & TournamentOptionsBasis &
    (
        | {
              format: 'single elimination'
          }
        | ({
              format: 'double elimination'
          } & DoubleEliminationBracketOptions)
    )

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

export class Tournament {
    public name: string
    public description = ''

    public readonly options: TournamentOptions
    public readonly manager: ParticipantManager = new ParticipantManager()

    constructor(options: TournamentOptions) {
        this.name = options.name
        this.options = options

        if (options.description) this.description = options.description
    }
}
