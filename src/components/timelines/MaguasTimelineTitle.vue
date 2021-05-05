<template>
  <v-timeline-item class="mb-6" hide-dot>
    <span
      ><b>{{ title }}</b></span
    >
  </v-timeline-item>
</template>

<script>
export default {
  name: "MaguasTimelineTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
