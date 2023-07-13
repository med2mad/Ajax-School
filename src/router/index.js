import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Fetch from '../views/Fetch.vue'
import Axios from '../views/Axios.vue'
import XHR from '../views/XHR.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fetch',
    name: 'fetch',
    component: Fetch
  },
  {
    path: '/axios',
    name: 'axios',
    component: Axios
  },
  {
    path: '/xhr',
    name: 'xhr',
    component: XHR
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
