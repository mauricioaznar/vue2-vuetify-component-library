<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <maguas-text-field v-model="text" name="name" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MaguasTextField from "@/components/forms/MaguasTextField";
export default {
  components: { MaguasTextField },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped></style>
