<template>
  <div>
    <v-row align="center">
      <v-col cols="auto">
        <h1>Citas</h1>
      </v-col>
      <v-spacer />
      <v-col>
        <vee-date
          label="Fecha"
          seleccionada
          v-model="selectedDate"
          no-label
          name="Fecha seleccionada"
        >
        </vee-date>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn fab dark rounded small @click="createAppointment">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-calendar
          class="items-calendar"
          v-model="selectedDate"
          first-interval="6"
          interval-count="16"
          ref="calendar"
          type="category"
          color="primary"
          :category-show-all="true"
          short-intervals
          :categories="categories"
          :events="events"
          :event-color="getEventColor"
          event-overlap-mode="stack"
          interval-height="42"
          @click:event="showEvent"
        >
        </v-calendar>
      </v-col>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        nudge-right="160"
      >
        <v-card width="300px" min-height="350px" flat>
          <v-toolbar :color="selectedEvent.color">
            <v-toolbar-title
              v-html="
                `${formatTime(selectedEvent.start)} - ${formatTime(
                  selectedEvent.end
                )}`
              "
            >
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="
                () => {
                  editItem(this.selectedItem);
                }
              "
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="confirmDialog = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="selectedOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="text-wrap">
            <p>
              {{ selectedEvent.name }}
            </p>
            <v-divider />
            <!--            <p class="mt-4 mb-2">Usuarios:</p>-->
            <!--            <ul class="mb-4">-->
            <!--              <li-->
            <!--                v-for="user in selectedItem ? selectedItem.users : []"-->
            <!--                :key="user.id"-->
            <!--              >-->
            <!--                {{ user.fullname }}-->
            <!--              </li>-->
            <!--            </ul>-->
            <!--            <v-divider />-->
            <!--            <p class="mt-4 mb-2">Clientes</p>-->
            <!--            <ul>-->
            <!--              <li-->
            <!--                v-for="user in selectedItem ? selectedItem.clients : []"-->
            <!--                :key="user.id"-->
            <!--              >-->
            <!--                {{ user.fullname }}-->
            <!--              </li>-->
            <!--            </ul>-->
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>

    <v-row class="my-6"> </v-row>

    <confirm-dialog v-model="confirmDialog" @confirm="confirmDeletion" />
    <ErrorToaster v-model="fetchItemsError" @relogin="customFetch" />
    <ErrorToaster v-model="deleteError" @relogin="confirmDeletion" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VeeDate from "../form-inputs/MaguasDate.vue";
import moment from "moment";
import ConfirmDialog from "../layouts/MaguasConfirmDialog.vue";
import ErrorToaster from "../toasters/MaguasErrorToaster.vue";
import colors from "vuetify/lib/util/colors";
import {
  formatTime,
  dateFormat,
  dateTimeFormat,
} from "../..//helpers/date-formats";
import axios from "axios";

const mappedColors = [];
Object.keys(colors).forEach((color) => {
  const stringColor = colors[color].base;
  if (stringColor) {
    mappedColors.push(stringColor);
  }
});
Object.keys(colors).forEach((color) => {
  const stringColor = colors[color].base;
  if (stringColor) {
    mappedColors.push(stringColor);
  }
});

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;

  preventDefault(): void;

  stopPropagation(): void;

  target: EventTarget;
  timeStamp: Date;
  type: string;
}

export default Vue.extend({
  name: "MaguasWeekCalendar",
  components: { ErrorToaster, VeeDate, ConfirmDialog },
  props: {
    categoryProperty: {
      type: String,
      required: true,
    },
    categoryUrl: {
      type: String,
      required: true,
    },
    entityUrl: {
      type: String,
      required: true,
    },
    entityCategoryProperty: {
      type: String,
      required: true,
    },
    entityEventNameProperty: {
      type: String,
      required: true,
    },
    startDateProperty: {
      type: String,
      required: true,
    },
    endDateProperty: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      items: [],
      events: [] as any[],
      fetchItemsError: {},
      fetchCategoriesError: {},
      deleteError: {},
      categories: [],
      colors: mappedColors,
      selectedEvent: {} as { data: unknown },
      selectedItem: null as unknown | null,
      selectedElement: null as unknown | null,
      selectedOpen: false,
      loading: true,
      confirmDialog: false,
      selectedDate: moment("2020-11-25").format(dateFormat),
    };
  },
  mounted() {
    (this.$refs.calendar as Vue & { checkChange: () => void }).checkChange();
  },
  created() {
    this.customFetch();
  },
  methods: {
    formatTime: formatTime,
    customFetch: async function () {
      this.loading = true;
      try {
        const categoryResponse = await axios.get(`${this.categoryUrl}`);
        this.categories = categoryResponse.data.map(
          (category) => category[this.categoryProperty]
        );
      } catch (e) {
        this.fetchCategoriesError = e;
      }
      try {
        const itemResponse = await axios.get(`${this.entityUrl}`, {
          params: this.params,
        });
        this.items = itemResponse.data.results;
      } catch (e) {
        this.fetchItemsError = e;
      }
      this.loading = false;
    },
    editItem: function (item) {
      const id = String(item.id);
      this.$router.push({
        name: "itemsEdit",
        params: { id },
      });
    },
    deleteItem: async function (item) {
      try {
        this.$emit("delete", item);
      } catch (e) {
        this.deleteError = e;
      }
    },
    confirmDeletion: function () {
      if (this.selectedItem) {
        this.deleteItem(this.selectedItem);
      }
    },
    showEvent: function ({
      nativeEvent,
      event,
    }: {
      nativeEvent: SyntheticEvent;
      event: { data: unknown };
    }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedItem = event.data;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    createAppointment: function () {
      this.$router.push({
        name: "itemsNew",
      });
    },
    getEventColor(event: { color: string }) {
      return event.color;
    },
  },
  watch: {
    selectedDate: function () {
      this.customFetch();
    },
    items: function () {
      this.events = this.items.map((item) => {
        return {
          name: item[this.entityEventNameProperty],
          start: moment(item[this.startDateProperty]).format(dateTimeFormat),
          end: moment(item[this.endDateProperty]).format(dateTimeFormat),
          color: this.colors[item.machineId - 1],
          timed: false,
          category: item[this.entityCategoryProperty][this.categoryProperty],
          data: item,
        };
      });
    },
  },
});
</script>

<style>
.items-calendar .v-calendar-daily__head .v-calendar-category__category {
  padding: 1rem 0;
}
.items-calendar .v-calendar-daily__head .v-calendar-daily_head-weekday {
  display: none;
}
.items-calendar .v-calendar-daily__head .v-calendar-daily_head-day-label {
  display: none;
}
</style>
