import axios from 'axios'

import { useUserStore } from 'src/stores/user'

import { config } from './config'

export const https = () => {
    return axios.create({
        baseURL: config.network.api,
        timeout: config.network.timeout,
        headers: {
            token: useUserStore().token
        }
    })
}
