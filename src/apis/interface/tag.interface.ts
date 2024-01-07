import type { ICategoryResult } from './category.interface'
import type { IName, INameResult } from './name.interface'

export interface ITag extends IName {
    order?: number
    categoryId?: number
}

export interface ITagResult extends Required<ITag & INameResult> {}

export interface ITagRelationResult extends INameResult {
    order: number
    category: ICategoryResult
}
