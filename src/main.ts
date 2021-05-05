import { VueConstructor } from "vue";

// layouts
import MaguasConfirmDialog from "./components/layouts/MaguasConfirmDialog.vue";

// form-layouts
import MaguasDialogLayout from "./components/form-layouts/MaguasDialogLayout.vue";

// toasters
import MaguasErrorToaster from "./components/toasters/MaguasErrorToaster.vue";

// form-inputs
import MaguasTextField from "./components/form-inputs/MaguasTextField.vue";

// tables
import MaguasPagination from "./components/tables/MaguasPagination.vue";
import MaguasSimpleTable from "./components/tables/MaguasSimpleTable.vue";
import MaguasTableExample from "./components/MaguasTableExample.vue";
import MaguasDataTable from "./components/MaguasDataTable.vue";

// timelines
import MaguasTimeline from "./components/timelines/MaguasTimeline.vue";
import MaguasTimelineItem from "./components/timelines/MaguasTimelineItem.vue";
import MaguasTimelineTitle from "./components/timelines/MaguasTimelineTitle.vue";

import moment from "moment";

const ComponentLibrary = {
  install(Vue: VueConstructor, options = { baseURL: "", locale: "es" }) {
    moment.locale(options.locale);

    // form-layouts
    Vue.component("MaguasDialogLayout", MaguasDialogLayout);

    // form-inputs
    Vue.component("MaguasTextField", MaguasTextField);

    // tables
    Vue.component("MaguasSimpleTable", MaguasSimpleTable);
    Vue.component("MaguasPagination", MaguasPagination);
    Vue.component("MaguasTableExample", MaguasTableExample);
    Vue.component("MaguasDataTable", MaguasDataTable);

    // layouts
    Vue.component("MaguasConfirmDialog", MaguasConfirmDialog);

    // toasters
    Vue.component("MaguasErrorToaster", MaguasErrorToaster);

    // timelines
    Vue.component("MaguasTimeline", MaguasTimeline);
    Vue.component("MaguasTimelineItem", MaguasTimelineItem);
    Vue.component("MaguasTimelineTitle", MaguasTimelineTitle);
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// https://www.xiegerts.com/post/creating-vue-component-library-plugin/
