import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const defaultRoute = import.meta.env.VITE_APP_TARGET === 'mobile' ? '/mobile' : '/desktop'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: defaultRoute
  },
  {
    path: '/desktop',
    name: 'Desktop',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: () => import('@/views/MobileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
