import { VueConstructor } from "vue";
import MaguasTextField from "./components/MaguasTextField.vue";

const ComponentLibrary = {
  install(Vue: VueConstructor, options = {}) {
    // components
    Vue.component("MaguasTextField", MaguasTextField);
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// https://www.xiegerts.com/post/creating-vue-component-library-plugin/
