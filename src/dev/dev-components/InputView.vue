<template>
  <v-container>
    <maguas-text-field name="example name" v-model="exampleTextField" />
  </v-container>
</template>

<script>
import MaguasTextField from "@/components/forms/maguas-text-field";
export default {
  components: { MaguasTextField },
  data() {
    return {
      exampleTextField: "",
    };
  },
};
</script>

<style scoped></style>
