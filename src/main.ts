import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import i18n from './i18n'
import { router } from './router'
import vuetify from './vuetify'
import { installExtensions } from './extensions'
import globalAppComponents from './components/app'

const app = createApp(App)

installExtensions({
    app,
    beforeUse() {
        app.use(createPinia())
        app.use(i18n)
        app.use(router)
        app.use(vuetify)
        app.use(globalAppComponents)
    },
    afterUse() {
        app.mount('#app')
    }
})
