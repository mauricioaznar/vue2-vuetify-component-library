<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="dialog = !dialog"> Activate</v-btn>
      </v-col>
    </v-row>
    <maguas-dialog-layout
      title="this is a title"
      v-model="dialog"
      show-close
      :cancel-callback="cancel"
      :submit-callback="submit"
    >
      <maguas-text-field name="example name" v-model="exampleTextField" />
    </maguas-dialog-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import MaguasTextField from "@/components/form-inputs/MaguasTextField.vue";

export default Vue.extend({
  components: { MaguasTextField },
  data() {
    return {
      exampleTextField: "",
      dialog: false,
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
