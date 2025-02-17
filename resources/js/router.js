import { createWebHistory, createRouter } from 'vue-router'

import MainPage from './pages/MainPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import CatalogPage from './pages/CatalogPage.vue'
import ProductPage from './pages/ProductPage.vue'
import CartPage from './pages/CartPage.vue'
import OrderPage from './pages/OrderPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/:restaurantSlug/categories', name: 'categories', component: CategoryPage },
  { path: '/:restaurantSlug/catalog/:categorySlug', name: 'catalog', component: CatalogPage },
  {
    path: '/:restaurantSlug/catalog/new',
    name: 'newCatalog',
    component: CatalogPage,
    props: { categorySlug: 'new' },
  },
  { path: '/:restaurantSlug/:categorySlug/product/:productSlug', name: 'product', component: ProductPage },
  { path: '/:restaurantSlug/cart', name: 'cart', component: CartPage },
  { path: '/:restaurantSlug/order', name: 'order', component: OrderPage },
  { path: '/404', name: '404', component: NotFoundPage },
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  }
})

export default router