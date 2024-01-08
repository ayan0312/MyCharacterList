import type { ICharacterPatchedResult } from 'src/apis/interface/character.interface'

export type Properties = Record<string, any>

interface ParticipantOptions {
    name: string
    team?: boolean
    avatar: string
    properties: ICharacterPatchedResult
}

export class Participant {
    public readonly name: string
    public readonly team: boolean
    public readonly avatar: string
    public readonly properties: ICharacterPatchedResult

    constructor(options: ParticipantOptions) {
        this.name = options.name
        this.team = options.team || false
        this.avatar = options.avatar || ''
        this.properties = options.properties
    }
}

export class ParticipantManager {
    private participants: Participant[]

    constructor() {
        this.participants = []
    }

    public add(options: ParticipantOptions) {
        this.participants.push(new Participant(options))
    }

    public remove(participant: Participant) {
        const index = this.participants.indexOf(participant)
        if (index !== -1) return this.participants.splice(index, 1)[0]
    }

    public shuffleSeed() {
        this.participants.sort(() => Math.random() - 0.5)
    }

    public slice() {
        return this.participants.slice()
    }
}
