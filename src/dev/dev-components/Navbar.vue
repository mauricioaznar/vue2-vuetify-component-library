<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-toolbar id="custom-background">
      <v-spacer />
      <v-toolbar-items>
        <v-menu
          offset-y
          open-on-hover
          transition="slide-x-transition"
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="transparent" v-bind="attrs" v-on="on">
              Components
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/inputs">
              <v-list-item-title>Inputs</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          offset-y
          open-on-hover
          transition="slide-x-transition"
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="transparent" v-bind="attrs" v-on="on">
              Views
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/noAvailableService">
              <v-list-item-title>No available service</v-list-item-title>
            </v-list-item>
            <v-list-item to="/notFound">
              <v-list-item-title>Not found</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-title class="headline hidden-md-and-down">
        {{ name.toUpperCase() }} v.{{ version }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import pjson from "../../../package.json";

export default Vue.extend({
  data() {
    return {
      drawer: false,
      version: pjson.version,
      name: pjson.name,
    };
  },
  methods: {},
});
</script>

<style>
#custom-background {
  /*background: linear-gradient(*/
  /*  135deg,*/
  /*  #ffffff 0%,*/
  /*  #ffffff 30%,*/
  /*  #c1d72e 50%,*/
  /*  #50b948 75%,*/
  /*  #00703c 100%*/
  /*);*/
}
</style>
