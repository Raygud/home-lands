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
    path: '/boliger-til-salg',
    name: 'boliger-til-salg',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ListingsView.vue'),
  },
  {
    path: '/boliger-til-salg/:id',
    name: 'boliger-til-salg:id',
    component: () => import('../views/ListingDetailsView.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    beforeEnter: isLoggedIn,
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    beforeEnter: guard,
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/Profile/Review/:id',
    name: 'Profile-Review',
    beforeEnter: guard,
    component: () => import('../views/ProfileEditView.vue')
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
