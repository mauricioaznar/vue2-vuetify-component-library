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
          :headers="headers"
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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

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
      selectedItem: {},
      itemsPerPage: 10,
      loading: true,
      items: [],
      rowsPerPageItems: [10, 20, 30, 40, 50],
    };
  },
});
</script>
