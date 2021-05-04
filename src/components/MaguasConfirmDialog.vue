<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline text-center wrap">
        ¿Estas seguro que deseas borrar este registro?
      </v-card-title>
      <v-card-text>
        Esto significa que otros registros relacionados con este puedeen verse
        afectados. Revisa que ningun registro relacionado depende de
        este.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="cancel"> Cancelar </v-btn>
        <v-btn color="green darken-1" text @click="confirm"> De acuerdo </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MaguasConfirmDialog",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.dialog = this.value;
  },
  methods: {
    confirm: function () {
      this.$emit("confirm");
      this.dialog = false;
    },
    cancel: function () {
      this.$emit("cancel");
      this.dialog = false;
    },
  },
  watch: {
    dialog: function () {
      if (this.dialog) {
        this.$emit("input", true);
      } else {
        this.$emit("input", false);
      }
    },
    value: function () {
      this.dialog = this.value;
    },
  },
});
</script>

<style scoped></style>
