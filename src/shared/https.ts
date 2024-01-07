import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

import { useAppStore } from 'src/stores/app'
import { useUserStore } from 'src/stores/user'
import type { IFailedResponse, IResponse } from 'src/apis/interface/response.interface'

import { config } from './config'

export const https = () => {
    const instance = axios.create({
        baseURL: config.network.api,
        timeout: config.network.timeout,
        headers: {
            token: useUserStore().token
        }
    })
    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    return instance
}

export function useAxiosErrorHandler(
    callback?: (
        err:
            | {
                  error: AxiosError<IFailedResponse>
                  type: 'axios'
              }
            | {
                  error: Error
                  type: 'stock'
              }
    ) => void,
    snackbar = true
) {
    return (error: Error | AxiosError<IFailedResponse>) => {
        if (axios.isAxiosError<IFailedResponse>(error)) {
            callback &&
                callback({
                    error: error,
                    type: 'axios'
                })

            const message = error.response?.data.message
            if (snackbar && message) useAppStore().snackbar(message, { color: 'error' })
        } else {
            callback &&
                callback({
                    error: error,
                    type: 'stock'
                })
            if (snackbar) useAppStore().snackbar(error.message, { color: 'error' })
        }
    }
}

export function get<Result>(url: string, config?: AxiosRequestConfig) {
    return https().get<IResponse<Result>>(url, config)
}
