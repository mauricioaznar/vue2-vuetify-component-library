import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
