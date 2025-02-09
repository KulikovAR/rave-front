import api from '../api';

export default {
    namespaced: true,
    state: {
        restaurants: [],
        banner: null,
        categories: [],
        products: [], // Состояние для продуктов
        recommendedProducts: {} // Хранение рекомендованных продуктов для каждого ресторана
    },
    mutations: {
        setRestaurants(state, restaurants) {
            state.restaurants = restaurants;
        },
        setBanner(state, banner) {
            state.banner = banner;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setRecommendedProducts(state, { restaurantId, recommendedProducts }) {
            state.recommendedProducts[restaurantId] = recommendedProducts;
        }
    },
    actions: {
        async fetchRestaurants({ commit, state }) {
            if (state.restaurants.length === 0) {  // Проверка, если рестораны ещё не загружены
                try {
                    const { data } = await api.get('/restaurants');
                    commit('setRestaurants', data.data);
                } catch (error) {
                    console.error('Ошибка при загрузке ресторанов:', error);
                }
            }
        },
        async fetchBanner({ commit }) {
            try {
                const { data } = await api.get('/banners');
                commit('setBanner', data.data[0]);
            } catch (error) {
                console.error('Ошибка при загрузке баннера:', error);
            }
        },
        async fetchCategories({ commit }) {
            try {
                const { data } = await api.get('/categories');
                commit('setCategories', data.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        },
        async fetchProducts({ commit }) {
            try {
                const { data } = await api.get('/products');
                commit('setProducts', data.data || data); // Сохраняем продукты в хранилище
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        },
        updateRecommendedProducts({ commit, state, rootState }, restaurantId) {
            const cartItems = rootState.cart.carts[restaurantId] || [];
            const recommendedProductIds = [];

            // Собираем все уникальные рекомендации для продуктов в корзине
            cartItems.forEach(item => {
                if (item.recommended_products && Array.isArray(item.recommended_products)) {
                    item.recommended_products.forEach(recommended => {
                        recommendedProductIds.push(recommended.id);
                    });
                }
            });

            // Убираем повторяющиеся id продуктов
            const uniqueRecommendedIds = [...new Set(recommendedProductIds)];

            // Получаем все продукты для текущего ресторана
            const allProducts = state.products || [];
            const recommended = allProducts.filter(product =>
                uniqueRecommendedIds.includes(product.id) && !cartItems.some(item => item.id === product.id)
            );

            // Сохраняем рекомендованные товары для данного ресторана
            commit('setRecommendedProducts', { restaurantId, recommendedProducts: recommended });
        }
    },
    getters: {
        restaurants(state) {
            return state.restaurants;
        },
        banner(state) {
            return state.banner;
        },
        categories(state) {
            return state.categories;
        },
        products(state) {
            return state.products;
        },
        recommendedProducts: (state) => (restaurantId) => {
            return (state.recommendedProducts[restaurantId] || [])
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        },
        getProductBySlug: (state) => (slug) => {
            return state.products.find(product => product.slug === slug);
        }
    }
};