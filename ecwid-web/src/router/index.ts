import { createRouter, createWebHistory } from 'vue-router';
import Cart from '../components/Cart.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: '/',
    name: 'cart',
    component: Cart
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetail
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
