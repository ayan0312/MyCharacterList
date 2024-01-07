type Properties = Record<string, any>

interface ParticipantOptions<T extends Properties = {}> {
    name: string
    avatar: string
    properties: T
}

export class Participant<T extends Properties = {}> {
    public readonly name: string
    public readonly avatar: string
    public readonly properties: T

    constructor(options: ParticipantOptions<T>) {
        this.name = options.name
        this.avatar = options.avatar || ''
        this.properties = options.properties
    }
}

export class ParticipantManager<T extends Properties = {}> {
    private participants: Participant[]

    constructor() {
        this.participants = []
    }

    public add(options: Omit<ParticipantOptions<T>, 'seed'>) {
        this.participants.push(new Participant<T>(options))
    }

    public remove(participant: Participant<T>) {
        const index = this.participants.indexOf(participant)
        if (index !== -1) return this.participants.splice(index, 1)[0]
    }

    public shuffleSeed() {
        this.participants.sort(() => Math.random() - 0.5)
    }
}
