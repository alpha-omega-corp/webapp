import '@assets/styles/main.css'

import AppComponent from "@Components/AppComponent.vue";
import {createApp} from 'vue'
import {routes} from '@/router'
import {userKey, userStore} from "@/stores/UserStore";
import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import {getCookies} from "@/env.d";

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

function hasToken(): boolean {
    return getCookies()['JWT-TOKEN'] !== undefined
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token: string | null = userStore.state.jwtToken
    if (to.name !== 'Login' && !token) next({name: 'Login'})
    else next()
})

createApp(AppComponent)
    .use(router)
    .use(userStore, userKey)
    .mount('#app')



