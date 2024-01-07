import { https, type AxiosResponsePromise } from 'src/shared/https'
import type {
    ICharacter,
    ICharacterPatchedResult,
    ICharacterResult,
    ICharacterSearch
} from './interface/character.interface'

const route = 'characters'

export class CharacterService {
    public static findById(id: number, patch: true): AxiosResponsePromise<ICharacterPatchedResult>
    public static findById(id: number, patch: false): AxiosResponsePromise<ICharacterResult>
    public static findById(id: number, patch = false) {
        return https.get<ICharacterResult | ICharacterPatchedResult>(`${route}/${id}`, {
            params: {
                patch: String(patch)
            }
        })
    }

    public static findByIds(
        ids: number[],
        patch: true
    ): AxiosResponsePromise<ICharacterPatchedResult[]>
    public static findByIds(ids: number[], patch: false): AxiosResponsePromise<ICharacterResult[]>
    public static findByIds(ids: number[], patch = false) {
        return https.get<ICharacterResult[] | ICharacterPatchedResult[]>(route, {
            params: {
                ids: ids.join(),
                patch: String(patch)
            }
        })
    }

    public static search(options: ICharacterSearch) {
        return https.get<ICharacterPatchedResult[]>(route, {
            params: {
                options: JSON.stringify(options)
            }
        })
    }

    public static create(body: ICharacter) {
        return https.post<ICharacterResult>(route, body)
    }

    public static update(id: number, body: ICharacter) {
        return https.patch<ICharacterResult>(`${route}/${id}`, body)
    }

    // TODO
    public static updateByIds(ids: number[], char: ICharacter, diffs?: string[]) {
        return https.patch(route, { ids, char, diffs })
    }

    //
    public static delete(id: number) {
        return https.delete<ICharacterResult>(`${route}/${id}`)
    }
}
