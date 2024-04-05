import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Axios from '../views/Axios.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/axios',
    name: 'axios',
    component: Axios
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router