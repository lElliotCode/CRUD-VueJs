import { createApp } from "vue";
import App from "./App.vue";
import store from "./store.js";
import router from './router'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
