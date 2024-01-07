import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { useAppStore } from 'src/stores/app'
import { useUserStore } from 'src/stores/user'
import type { IFailedResponse, IResponse } from 'src/apis/interface/response.interface'

import { config } from './config'

export const createHttps = () => {
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

export type AxiosResponsePromise<T> = Promise<AxiosResponse<IResponse<T>>>

export const https = {
    get<Result>(url: string, config?: AxiosRequestConfig) {
        return createHttps().get<IResponse<Result>>(url, config)
    },
    post<Result, Data = any>(url: string, data?: Data, config?: AxiosRequestConfig) {
        return createHttps().post<IResponse<Result>>(url, data, config)
    },
    patch<Result, Data = any>(url: string, data?: Data, config?: AxiosRequestConfig) {
        return createHttps().patch<IResponse<Result>>(url, data, config)
    },
    delete<Result>(url: string, config?: AxiosRequestConfig) {
        return createHttps().delete<IResponse<Result>>(url, config)
    }
}
