<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <login v-model="activate" @relogin="relogin" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/views/Login.vue";
import { AxiosError } from "axios";

export default Vue.extend({
  name: "MaguasErrorToaster",
  components: { Login },
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      activate: false,
      snackbar: false,
      text: "",
    };
  },
  methods: {
    relogin: function () {
      this.$emit("relogin");
    },
    setError: function (e: AxiosError) {
      let serverError = e.response?.data?.message;
      const status = e.response?.status;
      if (status) {
        switch (status) {
          case 401:
            this.activate = true;
            break;
          default:
            break;
        }
      }
      if (!serverError) {
        if (e.message == "Network Error") {
          serverError = "Servicio no disponible";
          this.$router.push({
            name: "NotAvailableService",
          });
        } else {
          return;
        }
      }
      if (Array.isArray(serverError)) {
        this.text = "<ul>";
        this.text += serverError.reduce((acc, v) => acc + `<li>${v}</li>`, "");
        this.text += "</ul>";
      } else {
        this.text = serverError;
      }
      if (this.text !== "") {
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 30000);
      }
    },
  },
  created() {
    this.setError(this.value as AxiosError);
  },
  watch: {
    value: function (e) {
      this.setError(e);
    },
    snackbar: function (snackbar) {
      if (snackbar === false) {
        this.$emit("input", {});
      }
    },
  },
});
</script>
