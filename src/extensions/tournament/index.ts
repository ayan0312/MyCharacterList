import Tournament from './Tournament.vue'

import type { ExtensionRecordRaw } from 'src/extensions'

const raw: ExtensionRecordRaw = {
    name: 'Tournament',
    uuid: 'nil',
    route: {
        path: '/tournament',
        name: 'tournament',
        component: Tournament
    },
    version: 1,
    navItems: [
        {
            title: 'tournament',
            items: [
                {
                    title: 'tournament',
                    to: '/tournament'
                }
            ]
        }
    ],
    messages: {
        en: {
            tournament: 'Tournament'
        },
        'zh-CN': {
            tournament: '比赛'
        }
    }
}

export default raw
