import AppBtn from './AppBtn.vue'
import AppList from './AppList.vue'
import AppMenu from './AppMenu.vue'
import AppSheet from './AppSheet.vue'
import AppVerticalDivider from './AppVerticalDivider.vue'

import type { App } from 'vue'

export default {
    install: (app: App<Element>) => {
        app.component('AppBtn', AppBtn)
            .component('AppList', AppList)
            .component('AppMenu', AppMenu)
            .component('AppSheet', AppSheet)
            .component('AppVerticalDivider', AppVerticalDivider)
    }
}
