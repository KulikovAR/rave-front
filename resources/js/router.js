import { createWebHistory, createRouter } from 'vue-router'

// import MainPage from './pages/MainPage.vue'
import MainPage from './pages/MainPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import CatalogPage from './pages/CatalogPage.vue'
import ProductPage from './pages/ProductPage.vue'
import CartPage from './pages/CartPage.vue'
import OrderPage from './pages/OrderPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'





const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/categories', name: 'categories', component: CategoryPage },
  { path: '/catalog', name: 'catalog', component: CatalogPage },
  { path: '/product', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/404', name: '404', component: NotFoundPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
