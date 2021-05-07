<template>
  <maguas-week-calendar
    :category-url="'machines'"
    :category-property="'name'"
    :entity-url="'productionEvents/pagination'"
    :start-date-property="'startDateTime'"
    :end-date-property="'endDateTime'"
    :entity-event-name-property="'maintenanceEmployeeDescription'"
    :entity-category-property="'machine'"
    :params="params"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      params: {
        year: "2020",
        month: "11",
        page: "1",
        itemsPerPage: "3000",
        search: "",
      },
    };
  },
  methods: {
    cancel: function () {
      console.log("cancelled");
    },
    submit(isValid: boolean) {
      console.log(isValid);
    },
  },
});
</script>

<style scoped></style>
