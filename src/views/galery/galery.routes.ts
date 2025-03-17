import type { RouteRecordRaw } from 'vue-router'
import IconGaleryIcon from '~icons/icon/galeryIcon'

export const galeryViewRouteNames = {
  galery: 'galery'
}

export const galeryViewRoutes: Array<RouteRecordRaw> = [
  {
    path: '/galery',
    name: galeryViewRouteNames.galery,
    component: () => import('./Galery.vue'),
    meta: {
      requiresAuth: true,
      label: 'Galery',
      icon: IconGaleryIcon
    }
  }
]
