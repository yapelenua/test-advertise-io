import type { RouteRecordRaw } from 'vue-router'
import IconGenerateIcon from '~icons/icon/generateIcon'

export const generateViewRouteNames = {
  generate: 'generate'
}

export const generateViewRoutes: Array<RouteRecordRaw> = [
  {
    path: '/generate',
    name: generateViewRouteNames.generate,
    component: () => import('./Generate.vue'),
    meta: {
      requiresAuth: true,
      label: 'Generate',
      icon: IconGenerateIcon
    }
  }
]
