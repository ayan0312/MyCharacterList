export interface ISuccessArrayResponse<T extends any[]> {
    code: number
    result: {
        rows: T
        total: number
    }
    success: true
    message: string
}

export interface ISuccessPlainResponse<T> {
    code: number
    result: T
    success: true
    message: string
}

export interface IFailedResponse {
    code: number
    result: null
    errors: string[]
    success: false
    message: string
    timestamp: number
}

export type ISuccessResponse<T> = T extends any[]
    ? ISuccessArrayResponse<T>
    : ISuccessPlainResponse<T>

export type IResponse<T> = ISuccessResponse<T> | IFailedResponse
