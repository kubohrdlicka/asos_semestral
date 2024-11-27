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
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/AccountView.vue'),
    meta: {
      title: 'My Profile',
      layout: SimpleLayout
    }
  },
  {
    name: 'groups',
    path: '/groups',
    component: () => import('@/views/GroupsView.vue'),
    meta: {
      title: 'My Groups',
      layout: SimpleLayout
    }
  },
  {
    name: 'tags',
    path: '/tags',
    component: () => import('@/views/TagsView.vue'),
    meta: {
      title: 'My Tags',
      layout: SimpleLayout
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/TaskboardView.vue'),
    meta: {
      title: 'My Dashboard',
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
