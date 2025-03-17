import type { RouteRecordRaw } from 'vue-router'
import { generateViewRoutes } from '@/views/generate/generate.routes'
import { galeryViewRoutes } from '@/views/galery/galery.routes'
import { routeNames } from './route-names'

import { authRoutes } from '@/views/auth/auth.routes'

import BlankLayout from '@/layouts/BlankLayout.vue'

const defaultLayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: routeNames.rootPage,
  redirect: { name: routeNames.signIn },
  component: BlankLayout,
  children: [
    ...generateViewRoutes,
    ...galeryViewRoutes
  ]
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  authRoutes,
  defaultLayoutRoutes
]

export {
  routes,
  defaultLayoutRoutes
}
