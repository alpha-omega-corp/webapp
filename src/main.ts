import '@assets/styles/main.css'

import {createApp} from 'vue'
import {routes} from '@/router'
import {getCookies, userGuard} from "@/env.d";

import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    Router
} from "vue-router";
import AppComponent from "@Components/AppComponent.vue";


function hasToken(): boolean {
    return !!(getCookies()['JWT-TOKEN'])
}

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});



router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    userGuard()

    if (to.name !== 'Login' && !hasToken()) {
        next({name: 'Login'})
    } else {
        next()
    }
})

 createApp(AppComponent)
     .use(router)
     .mount('#app')



