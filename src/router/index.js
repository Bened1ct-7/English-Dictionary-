import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/History.vue')
    },
    {
      path: '/word/:id',
      name: 'Word',
      component: () => import('../views/Word.vue'),
      props: true
    },
    {
      path: '/bookmark',
      name: 'Bookmark',
      component: () => import('../views/Bookmark.vue')
    }
  ]
})

export default router
