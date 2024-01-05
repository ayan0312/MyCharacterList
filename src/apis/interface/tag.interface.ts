import type { ICategoryResult } from './category.interface'
import type { IName } from './name.interface'

export interface ITag extends IName {
    order?: number
    categoryId?: number
}

export interface ITagResult extends Required<IName> {
    order: number
    category?: ICategoryResult
}
