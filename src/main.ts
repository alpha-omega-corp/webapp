import '@assets/styles/main.css'

import AppComponent from "@Components/AppComponent.vue";
import {createApp} from 'vue'
import {routes} from '@/router'
import {userKey, userStore} from "@/stores/UserStore";
import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import {userGuard} from "@/guards";

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

function hasToken(): boolean {
    return userStore.state.jwtToken != null
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    userGuard()
    if (to.name !== 'Login' && !hasToken()) next({name: 'Login'})
    else next()
})

createApp(AppComponent)
    .use(router)
    .use(userStore, userKey)
    .mount('#app')



