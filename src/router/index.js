import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';


const guard = (to, from, next) => {

  if (store.state.authData) {
    next();
  } else {
    console.log(from)
    next('/login');
  }
};

const isLoggedIn = (to, from, next) => {
  if (store.state.authData && to.path !== '/') {
    console.log(from.path)
    next("/");
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    component: HomeView
  },
  {
    path: '/Hotels&Destination',
    name: 'Hotels&Destination',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Rooms',
    name: 'Rooms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    beforeEnter: guard,

  },
  {
    path: '/Reservation',
    name: 'Reservation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    beforeEnter: guard,

  },
  {
    path: '/Login',
    name: 'Login',
    beforeEnter: isLoggedIn,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
