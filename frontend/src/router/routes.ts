import NotFound from '@/views/NotFoundView.vue'
import { RouteRecordRaw } from 'vue-router'
import PlainLayout from '@/layout/PlainLayout.vue'
import SimpleLayout from '@/layout/SimpleLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/LandingView.vue'),
    meta: {
      title: 'Landing Page',
      layout: PlainLayout
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Login Page',
      layout: PlainLayout
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: 'Register Page',
      layout: PlainLayout
    }
  },
  {
    name: 'account',
    path: '/account',
    component: () => import('@/views/AccountView.vue'),
    meta: {
      title: 'Account Page',
      layout: SimpleLayout
    }
  },
  {
    name: 'taskboard',
    path: '/tasks',
    component: () => import('@/views/TaskboardView.vue'),
    meta: {
      title: 'Taskboard Page',
      layout: SimpleLayout
    },
    children: [
      {
        path: 'new',
        component: () => import('@/views/TaskCreateView.vue')
      },
      {
        path: ':id',
        component: () => import('@/views/TaskDetailView.vue')
      }
    ]
  },
  { path: '/:path(.*)', component: NotFound }
]
