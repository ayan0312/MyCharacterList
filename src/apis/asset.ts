import { config } from 'src/shared/config'
import { https } from 'src/shared/https'

const route = 'assets'

export function searchAssets(opts: {
    page?: number
    size?: number
    orderBy?: {
        sort: string
        order: 'ASC' | 'DESC'
    }
    condition?: {
        star?: boolean
        name?: string
        intro?: string
        tagIds?: string
        template?: boolean
        characterIds?: string
    }
}) {
    return https.get(route, {
        params: {
            options: JSON.stringify(opts)
        }
    })
}

export function getPatchedPaths(filenames: string[]) {
    return filenames.map((filename) => `${config.network.host}/${filename}`)
}

export function getOriginImages(filenames: string[]) {
    return filenames.map((filename) => getOriginImage(filename))
}

export function getOriginImage(filename: string) {
    if (filename.indexOf('?filename=') > -1)
        return `${config.network.host}/static/assets/${filename.split('?filename=')[1]}`
    return filename.replace('_thumbs', 's')
}

export function findNearAssetsById(id: number, left = 1, right = 1) {
    return https.get(route, {
        params: {
            near: JSON.stringify({
                id,
                left,
                right
            })
        }
    })
}

export function findAssetsById(
    id: number,
    opts: {
        relations?: string
    } = {}
) {
    return https.get(`${route}/${id}`, {
        params: opts
    })
}

export function findAssetsByIds(ids: number[], patch = false) {
    return https.get(route, {
        params: {
            ids: ids.join(),
            patch: String(patch)
        }
    })
}

export function createAsset(body: any) {
    return https.post(route, body)
}

export function deleteAsset(id: number) {
    return https.delete(`${route}/${id}`)
}

export function deleteUnstarAssets(recycle = false) {
    return https.delete(`${route}/unstar`, {
        params: {
            recycle: String(recycle)
        }
    })
}

export function deleteAssetsByIds(ids: number[]) {
    return https.delete(route, {
        params: {
            ids: ids.join()
        }
    })
}

export function updateAsset(id: number, body: any) {
    return https.patch(`${route}/${id}`, body)
}

export function updateAssetsByIds(ids: number[], asset: any, diffs?: string[]) {
    return https.patch(route, {
        ids,
        asset,
        diffs
    })
}
