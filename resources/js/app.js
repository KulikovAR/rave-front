import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
import store from './store';
import { IMaskDirective } from "vue-imask";

const app = createApp(App);

// Добавление глобальных данных
app.config.globalProperties.$restaurantPlugs = {
    'rave-burger': '/images/plugs/rave-burger.png',
    'rave-bistro': '/images/plugs/rave-bistro.png',
    'rave-sushi': '/images/plugs/rave-sushi.png'
};

app
    .use(router)
    .use(store)
    .directive('imask', IMaskDirective)
    .mount("#app");

require("./bootstrap");