import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NoAvailableService from "@/dev/views/NoAvaliableService.vue";
import NotFound from "@/dev/views/NotFound.vue";
import Home from "../dev-components/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/noAvailableService",
    name: "NoAvailableService",
    component: NoAvailableService,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
