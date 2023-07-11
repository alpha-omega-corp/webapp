import { Route } from '@assets/models/route';
import {
    HomeIcon,
    UserIcon,
    UserCircleIcon
} from '@heroicons/vue/24/outline'

const resolveComponent = (component: string) => {
    return () => import(`@Views/${component}.vue`)
}

export const routes: Route[] = [
    {
        path: '/profile',
        name: 'Profile',
        icon: UserCircleIcon,
        display: true,
        component: resolveComponent('UserPage')
    },
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
        icon: UserIcon,
        display: false,
        component: resolveComponent('RegisterPage')
    },

];