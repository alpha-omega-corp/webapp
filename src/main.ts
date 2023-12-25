import '@assets/styles/main.css'

import AppComponent from "@Components/AppComponent.vue";
import {createApp} from 'vue'
import {routes} from '@/router'
import {userKey, userStore} from "@/stores/UserStore";
import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {VAceEditor} from 'vue3-ace-editor';
import {Route} from "@assets/models/route";

hljs.registerLanguage('dockerfile', dockerfile);


const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

const setGuestPermissions = () => {
    sessionStorage.setItem('permissions', JSON.stringify({
        'home.read': true,
        'docker.read': true,
        'packages.read': true,
    }))
}

const canUserAccess = (to: RouteLocationNormalized): boolean => {
    const permString = sessionStorage.getItem('permissions')

    if (permString) {
        const permissions = JSON.parse(permString)
        const filteredRoutes: Route[] = routes.filter((r: Route) => {
            return r.path === to.path
        })

        if (filteredRoutes[0]) {
            const service: string = filteredRoutes[0].service
            if (service === 'guest') {
                return true
            }

            const canAccess = permissions[`${service}.read`]
            if (canAccess === undefined || !canAccess) {
                return false
            }
        }
    } else {
        setGuestPermissions()
    }
    return true
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token: string | null = sessionStorage.getItem('token')
    const canAccess: boolean = canUserAccess(to)

    if (canAccess) {
        next()
    }
})

createApp(AppComponent)
    .use(router)
    .use(userStore, userKey)
    .use(hljsVuePlugin)
    .component('VAceEditor', VAceEditor)
    .directive('can', {
        mounted(el, binding, node) {
            const permString = sessionStorage.getItem('permissions')
            if (permString) {
                const permissions = JSON.parse(permString)
                if (!permissions[binding.value]) {
                    el.style.display = 'none'
                }
            }
        },

    })
    .mount('#app')



