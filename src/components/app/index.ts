import AppBtn from './Btn.vue'
import AppList from './List.vue'
import AppMenu from './Menu.vue'
import AppSheet from './Sheet.vue'
import AppTooltipBtn from './TooltipBtn.vue'
import AppLinkListItem from './LinkListItem.vue'
import AppVerticalDivider from './VerticalDivider.vue'

import type { App } from 'vue'

export default {
    install: (app: App<Element>) => {
        app.component('AppBtn', AppBtn)
            .component('AppList', AppList)
            .component('AppMenu', AppMenu)
            .component('AppSheet', AppSheet)
            .component('AppTooltipBtn', AppTooltipBtn)
            .component('AppLinkListItem', AppLinkListItem)
            .component('AppVerticalDivider', AppVerticalDivider)
    }
}
