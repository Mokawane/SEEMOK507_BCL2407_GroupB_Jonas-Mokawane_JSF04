import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Products from './components/Products.vue'
import ProductPage from './pages/ProductPage.vue'
import Login from './components/Login.vue'

/**
 * The route configuration for the application.
 * @type {Array<Object>}
 */
const routes = [
   { path: "/", component: Products },
   { path: "/product/:id", component: ProductPage},
   { path: "/login", component: Login}
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

/**
 * Creates a Vue application instance and mounts it to the DOM.
 * @function
 */
const app = createApp(App);
app.use(router);
app.mount('#app');
