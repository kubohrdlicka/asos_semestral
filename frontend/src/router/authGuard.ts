import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { until } from '@vueuse/core'
import type { Router, RouteRecordName } from 'vue-router'
import { useInitialized } from '@/composables/useInitialized'

const noAuthWhitelist: RouteRecordName[] = [
  'register',
  'login',
  'dashboard',
  'profile',
  'groups'
]


export async function handleAfterLoginRouting(redirect?: string) {
  const userStore = useUserStore()
  await useInitialized([userStore])
  // Check if user has onboarding personal info
  if (redirect) {
    return { path: redirect }
  } else {
    return { path: '/' }
    //   return { name: 'workspace-create' }
  }
}

export default function useAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { isSigned, authSyncedAtLeastOnce } = storeToRefs(useUserStore())
    try {
      await until(authSyncedAtLeastOnce).toBe(true, {
        timeout: 100,
        throwOnTimeout: true,
      })

      // provide signIn status asynchronously
      const isSignedStatus = new Promise((resolve) => {
        setTimeout(() => {
          resolve(isSigned.value)
        })
      })

      // wait for signIn status which is assigned asynchronously
      if (await isSignedStatus) {
        if (['login', 'register'].includes(to.name)) {
          next(await handleAfterLoginRouting())
        } else {
          next()
        }
      } else {
        throw new Error('not-logged-iUser is not logged in')
      }
    } catch (error) {
      if (noAuthWhitelist.includes(to.name)) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  })
}

