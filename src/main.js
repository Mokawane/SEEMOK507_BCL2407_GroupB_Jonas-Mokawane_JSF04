import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from './components/ProductDetail.vue'
import ProductPage from './components/ProductPage.vue'

/**
 * The route configuration for the application.
 * @type {Array<Object>}
 */
const routes = [
   { path: "/", component: ProductDetail },
   { path: "/product/:id", component: ProductPage}
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
