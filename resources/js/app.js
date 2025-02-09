import { createApp } from "vue";

import App from "./App.vue";
import router from './router'
import store from './store';
import { IMaskDirective } from "vue-imask";


createApp(App)
    .use(router)
    .use(store)
    .directive('imask', IMaskDirective)
    .mount("#app");

require("./bootstrap");