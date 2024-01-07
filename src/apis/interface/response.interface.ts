export interface ISuccessArrayResponse<T = any> {
    code: number
    result: {
        rows: T[]
        total: number
    }
    success: true
    message: string
}

export interface ISuccessPlainResponse<T = any> {
    code: number
    result: T
    success: true
    message: string
}

export type ISuccessResponse<T = any> = ISuccessPlainResponse<T> | ISuccessArrayResponse<T>

export interface IFailedResponse {
    code: number
    result: null
    errors: string[]
    success: false
    message: string
    timestamp: number
}

export type IResponse<T = any> = ISuccessResponse<T> | IFailedResponse
