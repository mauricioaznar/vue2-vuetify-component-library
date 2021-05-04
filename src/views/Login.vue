<template>
  <dialog-layout
    title="Ingresar"
    @submit="handleSubmit"
    v-model="activateDialog"
  >
    <vee-text-field
      prepend-icon="mdi-account"
      name="login"
      v-model="credentials.username"
      label="Email"
      rules="required|email"
      id="login"
      type="text"
      no-label
    ></vee-text-field>
    <vee-text-field
      prepend-icon="mdi-lock"
      name="password"
      v-model="credentials.password"
      rules="required"
      label="Contraseña"
      id="password"
      type="password"
      no-label
    ></vee-text-field>
  </dialog-layout>
</template>

<script lang="ts">
import Vue from "vue";
import DialogLayout from "@/components/MaguasDialogLayout.vue";
import VeeTextField from "@/components/MaguasTextField.vue";
import axios from "axios";

export interface Credentials {
  username: string;
  password: string;
}

export default Vue.extend({
  components: {
    VeeTextField,
    DialogLayout,
  },
  data() {
    return {
      activateDialog: false,
      credentials: {
        username: "",
        password: "",
      } as Credentials,
    };
  },
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  created() {
    this.handleDialogLayout();
  },
  methods: {
    handleDialogLayout: function () {
      if (this.value) {
        this.activateDialog = true;
      }
    },
    handleSubmit: async function (isValid) {
      if (isValid) {
        try {
          const response = await axios.post("auth/login", {
            email: this.credentials.username,
            password: this.credentials.password,
          });
          if (response) {
            const token = `Bearer ${response.data.access_token}`;
            axios.defaults.headers.Authorization = token;
            window.localStorage.setItem("authToken", token);
          }
          this.$emit("relogin");
          this.activateDialog = false;
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  watch: {
    value: function () {
      this.handleDialogLayout();
    },
    activateDialog: function () {
      this.$emit("input", this.activateDialog);
    },
  },
});
</script>
