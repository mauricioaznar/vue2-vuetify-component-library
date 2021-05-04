import * as components from "./components";
import { VueConstructor } from "vue";
const ComponentLibrary = {
  install(Vue: VueConstructor, options = {}) {
    // components

    Object.keys(components).forEach((key) => {
      const component = components[key];

      Vue.component(component.name, component);
    });
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// https://www.xiegerts.com/post/creating-vue-component-library-plugin/
