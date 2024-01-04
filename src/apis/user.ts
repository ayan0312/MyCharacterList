export interface UserNotification {
    id: number
    read: boolean
    emoji: string
    title: string
    content: string
    created: number
    updated: number
    metadata?: {
        href: string
        text: string
    }
}

export interface UserSettings {
    theme: string
    locale: string
    quickbar: boolean
}

export interface User {
    name: string
    token: string
    avatar: string
    settings: UserSettings
    introduction: string
    notifications: UserNotification[]
}
