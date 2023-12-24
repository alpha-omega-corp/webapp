import {Route} from '@assets/models/route';
import {HomeIcon, UserIcon, CloudIcon} from '@heroicons/vue/24/outline'
import {ArchiveBoxIcon} from "@heroicons/vue/24/solid";

const resolveComponent = (component: string, dir?: string) => {
    return () => dir === undefined
        ? import(`@Views/${component}.vue`)
        : import(`@Views/${dir}/${component}.vue`)
}

export const routes: Route[] = [
    {
        service: 'home',
        path: '/',
        name: 'Home',
        icon: HomeIcon,
        display: true,
        component: resolveComponent('HomePage'),
    },

    {
        service: 'docker',
        path: '/docker',
        name: 'Docker',
        icon: CloudIcon,
        display: true,
        component: resolveComponent('DockerPage')
    },
    {
        service: 'docker',
        path: '/docker/container/:id/logs',
        component: resolveComponent('ContainerLogsPage')
    },

    {
        service: 'packages',
        path: '/packages',
        name: 'Packages',
        icon: ArchiveBoxIcon,
        display: true,
        component: resolveComponent('PackagesPage', 'packages')
    },
    {
        service: 'packages',
        path: '/packages/:id/inspect',
        component: resolveComponent('PackagePage', 'packages')
    },
    {
        service: 'packages',
        path: '/packages/create',
        component: resolveComponent('CreatePackagePage', 'packages')
    },

    {
        service: 'admin',
        path: '/admin',
        name: 'Admin',
        icon: UserIcon,
        display: true,
        component: resolveComponent('ManagePage', 'admin')
    },

    {
        service: 'guest',
        path: '/login',
        name: 'Login',
        component: resolveComponent('LoginPage')
    },
    {
        service: 'guest',
        path: '/register',
        name: 'Register',
        component: resolveComponent('RegisterPage')
    },
];