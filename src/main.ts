import { VueConstructor } from "vue";
import MaguasTextField from "./components/MaguasTextField.vue";
import MaguasConfirmDialog from "./components/MaguasConfirmDialog.vue";
import MaguasDialogLayout from "./components/MaguasDialogLayout.vue";
import MaguasErrorToaster from "@/components/MaguasErrorToaster.vue";
import MaguasSimplePaginationTable from "@/components/MaguasSimplePaginationTable.vue";

const ComponentLibrary = {
  install(Vue: VueConstructor, options = {}) {
    // components
    Vue.component(MaguasTextField.name, MaguasTextField);
    Vue.component(MaguasConfirmDialog.name, MaguasConfirmDialog);
    Vue.component(MaguasDialogLayout.name, MaguasDialogLayout);
    Vue.component(MaguasErrorToaster.name, MaguasErrorToaster);
    Vue.component(
      MaguasSimplePaginationTable.name,
      MaguasSimplePaginationTable
    );
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// https://www.xiegerts.com/post/creating-vue-component-library-plugin/
