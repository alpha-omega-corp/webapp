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
import { VAceEditor } from 'vue3-ace-editor';

hljs.registerLanguage('dockerfile', dockerfile);


const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token: string | null = sessionStorage.getItem('token')
    next()
})

createApp(AppComponent)
    .use(router)
    .use(userStore, userKey)
    .use(hljsVuePlugin)
    .component('VAceEditor', VAceEditor)
    .mount('#app')



