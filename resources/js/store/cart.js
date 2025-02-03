export default {
    namespaced: true,
    state: {
        carts: JSON.parse(localStorage.getItem('multiCart')) || {}  // Храним корзины по ресторанам
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

            state.carts = { ...state.carts };  // Создаём новый объект, чтобы Vuex отреагировал
            localStorage.setItem('multiCart', JSON.stringify(state.carts));
        },
        UPDATE_QUANTITY(state, { restaurantId, itemId, amount }) {
            const cart = state.carts[restaurantId] || [];
            const item = cart.find(i => i.id === itemId);

            if (item) {
                item.quantity += amount;
                if (item.quantity <= 0) {
                    state.carts[restaurantId] = cart.filter(i => i.id !== itemId);
                }
                state.carts = { ...state.carts };
                localStorage.setItem('multiCart', JSON.stringify(state.carts));
            }
        },
        REMOVE_ITEM(state, { restaurantId, itemId }) {
            state.carts[restaurantId] = state.carts[restaurantId].filter(i => i.id !== itemId);
            state.carts = { ...state.carts };
            localStorage.setItem('multiCart', JSON.stringify(state.carts));
        },
        CLEAR_CART(state, restaurantId) {
            state.carts[restaurantId] = [];
            state.carts = { ...state.carts };
            localStorage.setItem('multiCart', JSON.stringify(state.carts));
        }
    },
    actions: {
        addToCart({ commit }, payload) {
            commit('ADD_TO_CART', payload);
        },
        updateQuantity({ commit }, payload) {
            commit('UPDATE_QUANTITY', payload);
        },
        removeItem({ commit }, payload) {
            commit('REMOVE_ITEM', payload);
        },
        clearCart({ commit }, restaurantId) {
            commit('CLEAR_CART', restaurantId);
        }
    }
};