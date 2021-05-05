import Vue from "vue";
import App from "#/App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/vee-validate";
import axios from "axios";
import router from "./router";

import "./plugins/maguas-vuetify2";

Vue.config.productionTip = false;

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://inotest.mauaznar.com/"
    : "http://localhost:3000";

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
