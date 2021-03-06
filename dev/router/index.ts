import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NoAvailableService from "@/views/NoAvaliableService.vue";
import NotFound from "@/views/NotFound.vue";
import Home from "#/dev-components/Home.vue";
import InputView from "#/dev-components/InputView.vue";
import PaginationView from "#/dev-components/PaginationView.vue";
import TimelineView from "#/dev-components/TimelineView.vue";
import WeekCalendarView from "#/dev-components/WeekCalendarView.vue";

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
    path: "/inputs",
    name: "Inputs",
    component: InputView,
  },
  {
    path: "/paginations",
    name: "Pagination",
    component: PaginationView,
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: TimelineView,
  },
  {
    path: "/weekCalendar",
    name: "WeekCalendar",
    component: WeekCalendarView,
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
