import NotFound from '@/views/NotFoundView.vue'
import { RouteRecordRaw } from 'vue-router'
import PlainLayout from '@/layout/PlainLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/LandingView.vue'),
    meta: {
      title: 'Dashboard',
      layout: PlainLayout
    }
  },
  { path: '/:path(.*)', component: NotFound }
]
