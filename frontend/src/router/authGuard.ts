import type { Router, RouteRecordName } from 'vue-router'
import { useUserStore } from '@/store/user'

export const noAuthWhitelist: RouteRecordName[] = ['login', 'register']

export default function useAuthGuard(router: Router) {
  router.beforeEach(async (to: any, from: any, next) => {
    const store = useUserStore()

    if (store.isAuth) {
      if (noAuthWhitelist.includes(to.name)) {
        next({ name: 'index' })
      }
      next()
    } else {
      if (noAuthWhitelist.includes(to.name)) {
        next()
      } else {
        next({ name: 'login' })
      }
    }
  })
}
