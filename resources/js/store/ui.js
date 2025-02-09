export default {
    namespaced: true,
    state: {
        hasSeenPopUps: {} // Храним флаги по ресторанам, пример: { "restaurant1": true, "restaurant2": false }
    },
    mutations: {
        setHasSeenPopUp(state, restaurantSlug) {
            state.hasSeenPopUps = {
                ...state.hasSeenPopUps,
                [restaurantSlug]: true
            };
        }
    },
    actions: {
        markPopUpAsSeen({ commit }, restaurantSlug) {
            commit('setHasSeenPopUp', restaurantSlug);
        }
    },
    getters: {
        hasSeenPopUp: (state) => (restaurantSlug) => {
            return state.hasSeenPopUps[restaurantSlug] || false;
        }
    }
};