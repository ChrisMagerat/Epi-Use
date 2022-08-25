import { createRouter, createWebHistory } from 'vue-router'
import createWorker from '../components/createWorker.vue'

const routes = [
  {
    path: '/',
    name: 'create',
    component: createWorker
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/searchWorker.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../components/updateWorker.vue')
  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import('../components/deleteWorker.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
