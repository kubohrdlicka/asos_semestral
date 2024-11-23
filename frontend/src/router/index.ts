import useAuthGuard from '@/router/authGuard'
import { createRouter, createWebHistory } from 'vue-router'
import { routeTransitionDuration } from '@/App.vue'
import { routes } from '@/router/routes'

const scrollBehavior = (to:any, from:any, savedPosition:any) => {
  const defaultPosition = { top: 0 }
  return new Promise((resolve) => {
    // if no change in path, only in hash, we do not need to sync with the transition
    if (to.hash && to.path === from.path) {
      return resolve({ el: to.hash, behavior: 'smooth' })
    }
    // delay setting the scroll position for the route transition animation can happen
    setTimeout(() => {
      if (to.hash) {
        // add extra delay, so emelemtn with the hash is rendered before scrolling
        setTimeout(() => {
          resolve({ el: to.hash })
        }, 10)
      } else {
        resolve(savedPosition ? savedPosition : defaultPosition)
      }
    }, routeTransitionDuration)
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  // @ts-ignore
  scrollBehavior,
})

// FIXME: allow later
useAuthGuard(router)

export default router
