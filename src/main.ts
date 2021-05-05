import { VueConstructor } from "vue";
import MaguasTextField from "./components/MaguasTextField.vue";
import MaguasConfirmDialog from "./components/MaguasConfirmDialog.vue";
import MaguasDialogLayout from "./components/MaguasDialogLayout.vue";
import MaguasErrorToaster from "./components/MaguasErrorToaster.vue";
import MaguasSimplePagination from "./components/MaguasSimplePagination.vue";

const ComponentLibrary = {
  install(Vue: VueConstructor, options = { baseURL: "" }) {
    Vue.component("MaguasTextField", MaguasTextField);
    Vue.component("MaguasConfirmDialog", MaguasConfirmDialog);
    Vue.component("MaguasDialogLayout", MaguasDialogLayout);
    Vue.component("MaguasErrorToaster", MaguasErrorToaster);
    Vue.component("MaguasSimplePagination", MaguasSimplePagination);
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// https://www.xiegerts.com/post/creating-vue-component-library-plugin/
