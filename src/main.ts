import {createApp} from 'vue'
import {auth} from "@directives/auth";
import {user, userKey} from "@stores/user";
import {notification, notificationKey} from "@stores/notification";
import {VAceEditor} from 'vue3-ace-editor';

import router from "@router/index"
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import makefile from 'highlight.js/lib/languages/makefile';
import '@assets/styles/main.css'
import 'highlight.js/styles/stackoverflow-light.css'

import AppComponent from "@components/AppComponent.vue";

hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('makefile', makefile);

createApp(AppComponent)
    .directive('can', auth)
    .use(router)
    .use(hljsVuePlugin)
    .use(user, userKey)
    .use(notification, notificationKey)
    .component('VAceEditor', VAceEditor)
    .mount('#app')



