import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';



// Check if the user is logged in, if the user is logged in then send him to disired location, if not send user to login page
const guard = (to, from, next) => {
  if (store.state.authData) {
    next();
  } else {
    console.log(from)
    next('/login');
  }
};

// Reversed so if the user is logged in he can not access the login page
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
    component: () => import('../views/ListingsView.vue'),
  },
  {
    path: '/boliger-til-salg/filter/:filter',
    name: 'boliger-til-salg:filter',
    component: () => import('../views/ListingsView.vue'),
  },
  {
    // :id gives us a dynamic id we can use in our listings details to get the specific listing
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
