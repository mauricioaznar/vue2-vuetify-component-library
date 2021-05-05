<template>
  <v-container style="max-width: 1000px">
    <v-card class="py-2 px-4">
      <v-timeline dense clipped>
        <slot />
      </v-timeline>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MaguasTimeline",
};
</script>

<style scoped></style>
