export default {
    namespaced: true,
    state: {
        carts: JSON.parse(localStorage.getItem('multiCart')) || {},  // Корзины для разных ресторанов
    },
    getters: {
        getCart: (state) => (restaurantId) => {
            return state.carts[restaurantId] || [];
        },
        getTotalPrice: (state) => (restaurantId) => {
            return (state.carts[restaurantId] || []).reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    },
    mutations: {
        ADD_TO_CART(state, { restaurantId, item }) {
            if (!state.carts[restaurantId]) {
                state.carts[restaurantId] = [];
            }

            const cart = state.carts[restaurantId];
            const existingItem = cart.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push(item);
            }

            state.carts = { ...state.carts };
            localStorage.setItem('multiCart', JSON.stringify(state.carts));

            // Обновляем рекомендованные товары для данного ресторана
            this.dispatch('restaurant/updateRecommendedProducts', restaurantId);
        },

        REMOVE_ITEM(state, { restaurantId, itemId }) {
            state.carts[restaurantId] = state.carts[restaurantId].filter(i => i.id !== itemId);
            state.carts = { ...state.carts };
            localStorage.setItem('multiCart', JSON.stringify(state.carts));

            // Обновляем рекомендованные товары для данного ресторана
            this.dispatch('restaurant/updateRecommendedProducts', restaurantId);
        },

        CLEAR_CART(state, restaurantId) {
            state.carts[restaurantId] = [];
            state.carts = { ...state.carts };
            localStorage.setItem('multiCart', JSON.stringify(state.carts));

            // Обновляем рекомендованные товары для данного ресторана
            this.dispatch('restaurant/updateRecommendedProducts', restaurantId);
        },

        // Мутация для обновления количества товара в корзине
        UPDATE_QUANTITY(state, { restaurantId, itemId, amount }) {
            const cart = state.carts[restaurantId] || [];
            const item = cart.find(i => i.id === itemId);

            if (item) {
                if (item.quantity + amount > 0) {
                    item.quantity += amount;  // Обновляем количество, если оно больше нуля
                }
                state.carts = { ...state.carts };
                localStorage.setItem('multiCart', JSON.stringify(state.carts));
            }
        },

        // Мутация для очистки корзины по ресторану
        CLEAR_CART_FOR_RESTAURANT(state, restaurantSlug) {
            if (state.carts[restaurantSlug]) {
                state.carts[restaurantSlug] = [];
                state.carts = { ...state.carts };
                localStorage.setItem('multiCart', JSON.stringify(state.carts));

                // Обновляем рекомендованные товары для данного ресторана
                this.dispatch('restaurant/updateRecommendedProducts', restaurantSlug);
            }
        }
    },
    actions: {
        addToCart({ commit }, payload) {
            commit('ADD_TO_CART', payload);
        },
        removeItem({ commit }, payload) {
            commit('REMOVE_ITEM', payload);
        },
        clearCart({ commit }, restaurantId) {
            commit('CLEAR_CART', restaurantId);
        },

        // Действие для обновления количества товара в корзине
        updateQuantity({ commit }, payload) {
            commit('UPDATE_QUANTITY', payload);
        },

        // Действие для очистки корзины по ресторану
        clearCartForRestaurant({ commit }, restaurantSlug) {
            commit('CLEAR_CART_FOR_RESTAURANT', restaurantSlug);
        }
    }
};