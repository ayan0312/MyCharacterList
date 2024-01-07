import type { IStarName, IStarNameResult } from './name.interface'
import type { ISearch } from './search.interface'
import type { ITagRelationResult } from './tag.interface'

export interface ICharacterStaticCategory {
    [propname: number]: string
}

export interface ICharacterFeature {
    [propname: string]: string
}

export interface ICharacter extends IStarName {
    intro?: string
    avatar?: string
    tagIds?: string
    recycle?: boolean
    template?: boolean
    relationships?: string[]
    staticCategories?: ICharacterStaticCategory
    fullLengthPicture?: string
}

export interface ICharacterResult extends IStarNameResult {
    wiki: string
    intro: string
    tagIds: string
    avatar: string
    recycle: boolean
    template: boolean
    staticCategories: ICharacterStaticCategory
    fullLengthPicture: string
}

export interface ICharacterPatchedResult extends ICharacterResult {
    xs: {
        avatar: string
        fullLengthPicture: string
    }
    tags: ITagRelationResult[]
    features: ICharacterFeature
}

export interface ICharacterSearchCondition extends IStarName {
    intro?: string
    tagIds?: string
    recycle?: boolean
    template?: boolean
}

export interface ICharacterSearch extends ISearch<ICharacterSearchCondition> {}
