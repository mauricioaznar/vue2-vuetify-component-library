<template>
  <v-app>
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "./dev-components/Navbar";

export default {
  components: { Navbar },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped></style>
