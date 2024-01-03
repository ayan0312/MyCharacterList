import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import i18n from './i18n'
import globalComponents from './components'
import { myCharacterListCore } from './core'

const app = createApp(App)

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    components,
    directives
})

app.use(createPinia())
app.use(i18n)
app.use(vuetify)
app.use(globalComponents)
app.use(myCharacterListCore)

app.mount('#app')
