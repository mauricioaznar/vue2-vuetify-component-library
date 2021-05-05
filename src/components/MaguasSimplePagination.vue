<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark :src="banner">
          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="createItem">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :disable-pagination="disablePagination"
          :hide-default-footer="disablePagination"
          disable-sort
          :search="search"
          :headers="computedHeaders"
          :items="items"
          :loading="loading"
          loading-text="Cargando..."
          :items-per-page="itemsPerPage"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50],
            'items-per-page-text': '',
          }"
        >
          <template
            v-for="header in headers.filter((h) =>
              h.hasOwnProperty('formatter')
            )"
            v-slot:[`item.${header.value}`]="{ header: header, value }"
          >
            <template v-if="Array.isArray(value)">
              <ul :key="header.text">
                <li v-for="(item, index) in value" :key="index">
                  {{ header.formatter(item) }}
                </li>
              </ul>
            </template>
            <template v-else>
              {{ header.formatter(value) }}
            </template>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-row>
              <v-btn
                small
                icon
                @click="
                  () => {
                    editItem(item);
                  }
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                small
                icon
                @click="
                  confirmDialog = true;
                  selectedItem = item;
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "MaguasSimplePagination",
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
      selectedItem: null as { id: number } | null,
      confirmDialog: false,
      deleteError: {},
      customFetchError: {},
      itemsPerPage: 10,
      selectedClient: {},
      loading: true,
      items: [] as { id: number }[],
      rowsPerPageItems: [10, 20, 30, 40, 50],
    };
  },
  computed: {
    computedHeaders: function (): {
      text: string;
      formatter?: () => string;
      value: string;
    }[] {
      const headers = this.headers as {
        text: string;
        formatter?: () => string;
        value: string;
      }[];

      return [
        ...headers,
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
    editItem: function (item: { id: number }) {
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
    deleteItem: async function (item: { id: number }) {
      try {
        await axios.delete(`${this.entityUrl}/${item.id}`);
        this.items = this.items.filter((c) => {
          return c.id !== this.selectedItem?.id;
        });
      } catch (e) {
        this.deleteError = e;
      }
    },
    customFetch: async function () {
      this.loading = true;
      try {
        const responses = await Promise.all([
          axios.get(`${this.entityUrl}`, {
            params: { ...this.fetchParams },
          }),
        ]);
        const response1 = responses[0];
        if (response1.data) {
          this.items = response1.data;
        }
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
});
</script>

<style scoped></style>
