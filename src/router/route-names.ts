import { authRouteNames } from '@/views/auth/auth.routes'
import { galeryViewRouteNames } from '@/views/galery/galery.routes'
import { generateViewRouteNames } from '@/views/generate/generate.routes'

export const routeNames = {
  rootPage: 'rootPage',

  ...authRouteNames,
  ...generateViewRouteNames,
  ...galeryViewRouteNames,

  additionalDefaultLayoutRoute: 'additionalDefaultLayoutRoute',
  additionalNoLayoutRoute: 'additionalNoLayoutRoute'
}
