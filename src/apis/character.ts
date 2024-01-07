import { https } from 'src/shared/https'
import type {
    ICharacter,
    ICharacterPatchedResult,
    ICharacterSearch
} from './interface/character.interface'

const route = 'characters'

export function findCharById(id: number, options: ICharacter = {}) {
    return https.get(`${route}/${id}`, { params: options })
}

// export function findCharByIds(ids: number[], patch: false): Promise<ICharacterResult[]>
// export function findCharByIds(ids: number[], patch: true): Promise<ICharacterPatchedResult[]>
export function findCharByIds(ids: number[], patch: boolean = false) {
    return https.get(route, {
        params: {
            ids: ids.join(),
            patch: String(patch)
        }
    })
}

export function searchChars(options: ICharacterSearch) {
    return https.get<ICharacterPatchedResult[]>(route, {
        params: {
            options: JSON.stringify(options)
        }
    })
}

export function createChars(body: any) {
    return https.post(route, body)
}

export function updateChars(id: number, body: any) {
    return https.patch(`${route}/${id}`, body)
}

export function updateCharsByIds(ids: number[], char: any, diffs?: string[]) {
    return https.patch(route, { ids, char, diffs })
}

export function deleteChar(id: number) {
    return https.delete(`${route}/${id}`)
}
