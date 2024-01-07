import { https, type AxiosResponsePromise } from 'src/shared/https'
import type {
    ICharacter,
    ICharacterPatchedResult,
    ICharacterResult,
    ICharacterSearch
} from './interface/character.interface'

const route = 'characters'

export function findCharById(id: number, patch: true): AxiosResponsePromise<ICharacterPatchedResult>
export function findCharById(id: number, patch: false): AxiosResponsePromise<ICharacterResult>
export function findCharById(id: number, patch = false) {
    return https.get<ICharacterResult | ICharacterPatchedResult>(`${route}/${id}`, {
        params: {
            patch: String(patch)
        }
    })
}

export function findCharByIds(
    ids: number[],
    patch: true
): AxiosResponsePromise<ICharacterPatchedResult[]>
export function findCharByIds(ids: number[], patch: false): AxiosResponsePromise<ICharacterResult[]>
export function findCharByIds(ids: number[], patch = false) {
    return https.get<ICharacterResult[] | ICharacterPatchedResult[]>(route, {
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

export function createChars(body: ICharacter) {
    return https.post<ICharacterResult>(route, body)
}

export function updateChars(id: number, body: ICharacter) {
    return https.patch<ICharacterResult>(`${route}/${id}`, body)
}

// TODO
export function updateCharsByIds(ids: number[], char: ICharacter, diffs?: string[]) {
    return https.patch(route, { ids, char, diffs })
}

//
export function deleteChar(id: number) {
    return https.delete<ICharacterResult>(`${route}/${id}`)
}
