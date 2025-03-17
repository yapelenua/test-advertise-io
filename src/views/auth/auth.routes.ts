import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const authRouteNames = {
  auth: 'auth',
  signIn: 'signIn',
  signUp: 'signUp'
}

export const authRoutes: RouteRecordRaw = {
  name: authRouteNames.auth,
  path: '/auth',
  redirect: { name: authRouteNames.signIn },
  component: DefaultLayout,
  children: [
    {
      path: 'sign-in',
      name: authRouteNames.signIn,
      component: () => import('./SignIn.vue')
    },
    {
      path: 'sign-up',
      name: authRouteNames.signUp,
      component: () => import('./SignUp.vue')
    }
  ]
}
