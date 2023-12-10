import {Route} from '@assets/models/route';
import {HomeIcon, UserIcon, CloudIcon} from '@heroicons/vue/24/outline'
import {ArchiveBoxIcon} from "@heroicons/vue/24/solid";
const resolveComponent = (component: string) => {
    return () => import(`@Views/${component}.vue`)
}

export const routes: Route[] = [
    {
        path: '/',
        name: 'Home',
        icon: HomeIcon,
        display: true,
        component: resolveComponent('HomePage'),
    },
    {
        path: '/login',
        name: 'Login',
        icon: UserIcon,
        display: false,
        component: resolveComponent('LoginPage')
    },
    {
        path: '/register',
        name: 'Register',
        icon: HomeIcon,
        display: false,
        component: resolveComponent('RegisterPage')
    },
    {
        path: '/docker',
        name: 'Docker',
        icon: CloudIcon,
        display: true,
        component: resolveComponent('DockerPage')
    },
    {
        path: '/docker/container/:id/logs',
        name: 'Logs',
        icon: undefined,
        display: false,
        component: resolveComponent('ContainerLogsPage')
    },
    {
        path: '/packages',
        name: 'Packages',
        icon: ArchiveBoxIcon,
        display: true,
        component: resolveComponent('PackagesPage')
    },
    {
        path: '/packages/:id/inspect',
        name: 'Package',
        icon: ArchiveBoxIcon,
        display: false,
        props: true,
        component: resolveComponent('PackagePage')
    },
    {
        path: '/packages/create',
        name: 'CreatePackage',
        icon: undefined,
        display: false,
        component: resolveComponent('CreatePackagePage')
    },
];