<template>
  <v-container>
    <maguas-simple-pagination
      create-route-name="A"
      edit-route-name="a"
      entity-url="http://localhost:3000/equipments"
      title="A title"
      :headers="headers"
    />
    <v-btn @click="dialog = !dialog"> Activate</v-btn>
  </v-container>
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
