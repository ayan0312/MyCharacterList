import type { App } from 'vue'

export interface Extension {
    name: string
    uuid: string
    install: (core: Core) => void
    version: number
}

class Core {
    public readonly app: App<Element>
    public readonly extensions: Extension[] = []

    constructor(app: App<Element>) {
        this.app = app
    }

    public register(extension: Extension) {
        this.extensions.push(extension)
        extension.install(this)
    }

    public unregister(extension: Extension) {
        const index = this.extensions.indexOf(extension)
        if (index !== -1) this.extensions.splice(index, 1)
    }

    public getExtensions() {
        return this.extensions
    }

    public getExtension(name: string) {
        return this.extensions.find((extension) => extension.name === name)
    }
}

export const myCharacterListCore = {
    install(app: App<Element>) {
        const core = new Core(app)
        app.config.globalProperties.$myCharacterList = core
        app.provide('$myCharacterList', core)
    }
}
