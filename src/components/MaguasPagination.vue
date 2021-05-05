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

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MaguasPagination",
  props: {},
  data() {
    return {
      selectedItem: {},
      itemsPerPage: 10,
      loading: true,
      items: [],
      headers: [],
      rowsPerPageItems: [10, 20, 30, 40, 50],
    };
  },
});
</script>
