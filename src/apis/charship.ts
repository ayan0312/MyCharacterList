import { https } from 'src/shared/https'
import type { ICharactership } from './interface/charactership.interface'

const routes = 'characterships'

export function getCharshipsByCharId(id: number, type?: 'character' | 'preview' | 'relationship') {
    return https().get(`${routes}/${id}`, {
        params: {
            type
        }
    })
}

export function createCharship(body: ICharactership) {
    return https().post(routes, body)
}

export function updateCharship(id: number, body: ICharactership) {
    return https().patch(`${routes}/${id}`, body)
}

export function deleteCharship(id: number) {
    return https().delete(`${routes}/${id}`)
}
