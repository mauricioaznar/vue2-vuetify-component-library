<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    disable-pagination
    hide-default-footer
    :headers="headers"
    :items="items"
    :loading="loading"
  >
    <template
      v-for="header in headers.filter((h) => h.hasOwnProperty('formatter'))"
      v-slot:[`item.${header.value}`]="{ header: header, value }"
    >
      <template>
        {{ header.formatter(value) }}
      </template>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <slot name="expanded-item" :headers="headers" :item="item"> </slot>
    </template>
  </v-data-table>
</template>

<script>
import ConfirmDialog from "./MaguasConfirmDialog.vue";
import ErrorToaster from "./MaguasErrorToaster.vue";

export default {
  name: "MaguasPagination",
  props: {
    disablePagination: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    headers: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    entityUrl: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      default: () => {
        return;
      },
    },
    editRouteName: {
      type: String,
      required: true,
    },
    createRouteName: {
      type: String,
      required: true,
    },
    fetchParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
    search: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  data() {
    return {
      selectedItem: {},
      confirmDialog: false,
      deleteError: {},
      customFetchError: {},
      itemsPerPage: 10,
      selectedClient: {},
      loading: true,
      items: [],
      rowsPerPageItems: [10, 20, 30, 40, 50],
    };
  },
  computed: {
    computedHeaders: function () {
      return [
        ...this.headers,
        {
          text: "Acciones",
          value: "actions",
        },
      ];
    },
  },
  created() {
    this.customFetch();
  },
  methods: {
    editItem: function (item) {
      const id = String(item.id);
      this.$router.push({
        name: this.editRouteName,
        params: { id },
      });
    },
    createItem: function () {
      this.$router.push({
        name: this.createRouteName,
      });
    },
    confirmDeletion: function () {
      if (this.selectedItem) {
        this.deleteItem(this.selectedItem);
      }
    },
    deleteItem: async function (item) {
      try {
        // await INOPACK.delete(`${this.entityUrl}/${item.id}`);
        // this.items = this.items.filter((c) => {
        //   return c.id !== this.selectedItem?.id;
        // });
      } catch (e) {
        this.deleteError = e;
      }
    },
    customFetch: async function () {
      this.loading = true;
      try {
        // const responses = await Promise.all([
        //   INOPACK.get(`${this.entityUrl}`, {
        //     params: { ...this.fetchParams },
        //   }),
        // ]);
        // const response1 = responses[0];
        // if (response1.data) {
        //   this.items = response1.data;
        // }
      } catch (e) {
        this.customFetchError = e;
      }
      this.loading = false;
    },
  },
  watch: {
    fetchParams: {
      handler: function () {
        this.customFetch();
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
