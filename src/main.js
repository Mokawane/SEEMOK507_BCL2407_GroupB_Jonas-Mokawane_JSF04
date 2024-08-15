import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Products from './components/Products.vue'
import ProductPage from './pages/ProductPage.vue'
import Login from './pages/Login.vue'
import Wishlist from './pages/Wishlist.vue'
import Cart from './pages/Cart.vue'
import store from './store'

/**
 * The route configuration for the application.
 * @type {Array<Object>}
 */
const routes = [
   { path: "/", component: Products },
   { path: "/product/:id", component: ProductPage},
   { path: "/login", component: Login},
   { path: "/wishlist", component: Wishlist, meta: { requiresAuth: true } },
   { path: "/cart", component: Cart, meta: { requiresAuth: true } }
];

/**
 * Creates a router instance with the provided routes and history mode.
 * @function
 * @returns {import('vue-router').Router} The router instance.
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
  }); 

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    }
  });
  
/**
 * Creates a Vue application instance and mounts it to the DOM.
 * @function
 */
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
