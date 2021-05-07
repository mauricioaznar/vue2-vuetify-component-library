<template>
  <maguas-week-calendar />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      exampleTextField: "",
      dialog: false,
      headers: [
        {
          text: "A",
          value: "a",
        },
      ],
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
