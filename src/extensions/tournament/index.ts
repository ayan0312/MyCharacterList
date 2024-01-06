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
            title: 'tournament.tournament',
            items: [
                {
                    title: 'tournament.bracket',
                    to: '/tournament'
                }
            ],
            activeIcon: 'mdi-trophy-variant-outline',
            inactiveIcon: 'mdi-trophy-variant-outline'
        }
    ],
    i18n: {
        root: 'tournament',
        messages: {
            en: {
                bracket: 'Bracket',
                tournament: 'Tournament'
            },
            'zh-CN': {
                bracket: '淘汰赛',
                tournament: '锦标赛'
            }
        }
    }
}

export default raw
