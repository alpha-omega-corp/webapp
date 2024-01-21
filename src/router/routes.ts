import {Route} from '@/models/route';
import {ArchiveBoxIcon, Cog6ToothIcon, HomeIcon, UserIcon} from '@heroicons/vue/24/outline'

const resolveComponent = (component: string, dir?: string) => {
    return (): Promise<unknown> => dir === undefined
        ? import(`@views/${component}.vue`)
        : import(`@views/${dir}/${component}.vue`)
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
        service: 'guest',
        path: '/login',
        name: 'Login',
        component: resolveComponent('LoginPage', 'user')
    },
    {
        service: 'guest',
        path: '/register',
        name: 'Register',
        component: resolveComponent('RegisterPage', 'user')
    },
    {
        service: 'packages',
        path: '/packages',
        name: 'Packages',
        icon: ArchiveBoxIcon,
        display: true,
        component: resolveComponent('ManagePage', 'packages')
    },
    {
        service: 'packages',
        path: '/packages/:name/inspect',
        component: resolveComponent('PackagePage', 'packages')
    },
    {
        service: 'admin',
        path: '/admin/configs',
        name: 'Configs',
        icon: Cog6ToothIcon,
        display: true,
        component: resolveComponent('ConfigPage', 'admin')
    },
    {
        service: 'admin',
        path: '/admin/user',
        name: 'Permissions',
        icon: UserIcon,
        display: true,
        component: resolveComponent('PermissionPage', 'admin')
    },
];