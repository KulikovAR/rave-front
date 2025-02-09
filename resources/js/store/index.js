import { createStore } from 'vuex';
import cart from './cart';
import restaurant from './restaurant'; 
import ui from './ui';

const store = createStore({
  modules: {
    cart,
    restaurant,
    ui,
  },
});

export default store;