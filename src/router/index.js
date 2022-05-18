import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getToken } from '../vue-apollo.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/employees/add',
    name: 'addEmployee',
    component: () => import('../views/AddEmployee.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/employees/page/:page',
    name: 'employees',
    component: HomeView
  },
  {
    path: '/employees/:id',
    name: 'employee',
    component: () => import('../views/EmployeeView.vue')
  },
  {
    path: '/employees/:id/edit',
    name: 'EditEmployee',
    component: () => import('../views/EditEmployee.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authToken = getToken()
    if(!authToken) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
