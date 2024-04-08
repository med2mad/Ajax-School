import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Showresult from '../views/Showresult.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Showresult',
    name: 'Showresult',
    component: Showresult
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router