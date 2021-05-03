import Vue from "vue";
import App from "./dev/App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/vee-validate";

import "./plugins/maguas-vuetify2";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
