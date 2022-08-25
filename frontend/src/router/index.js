import { createRouter, createWebHistory } from 'vue-router'
import searchWorker from '../components/searchWorker.vue'

const routes = [
  {
    path: '/',
    name: 'search',
    component: searchWorker
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../components/createWorker.vue')
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
