import type { IName } from './name.interface'

export interface IStaticCategory extends IName {
    intro?: string
}

export interface IStaticCategoryResult extends Required<IStaticCategory> {}
