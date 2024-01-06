import { createRouter, createWebHistory } from 'vue-router'

import App404 from 'src/layouts/404.vue'
import AppHome from 'src/layouts/Home.vue'
import AppAbout from 'src/layouts/About.vue'
import LoadingExtensions from 'src/layouts/LoadingExtensions.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/about',
            name: 'about',
            component: AppAbout
        },
        {
            path: '/loading-extensions',
            name: 'LoadingExtensions',
            component: LoadingExtensions
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: App404
        }
    ]
})
