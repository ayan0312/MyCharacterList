import type { ICommonResult } from './common.interface'

export interface IName {
    name?: string
}

export interface INameResult extends Required<IName & ICommonResult> {}

export interface IStarName extends IName {
    star?: boolean
}

export interface IStarNameResult extends Required<IStarName> {}
