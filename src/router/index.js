import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Fetch from '../views/Fetch.vue'
import JQuery from '../views/JQuery.vue'
import Axios from '../views/Axios.vue'
import XHR from '../views/XHR.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/fetch',
    name: 'fetch',
    component: Fetch
  },
  {
    path: '/jquery',
    name: 'jquery',
    component: JQuery
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
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router