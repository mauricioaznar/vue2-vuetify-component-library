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
          class="appointments-calendar"
          v-model="selectedDate"
          first-interval="6"
          interval-count="16"
          ref="calendar"
          type="category"
          color="primary"
          :category-show-all="true"
          short-intervals
          :categories="rooms"
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
                  editItem(this.selectedAppointment);
                }
              "
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-if="selectedAppointment && selectedAppointment.editable"
              icon
              @click="confirmDialog = true"
            >
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
            <p class="mt-4 mb-2">Usuarios:</p>
            <ul class="mb-4">
              <li
                v-for="user in selectedAppointment
                  ? selectedAppointment.users
                  : []"
                :key="user.id"
              >
                {{ user.fullname }}
              </li>
            </ul>
            <v-divider />
            <p class="mt-4 mb-2">Clientes</p>
            <ul>
              <li
                v-for="user in selectedAppointment
                  ? selectedAppointment.clients
                  : []"
                :key="user.id"
              >
                {{ user.fullname }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>

    <v-row class="my-6"> </v-row>

    <confirm-dialog v-model="confirmDialog" @confirm="confirmDeletion" />
    <ErrorToaster v-model="fetchError" @relogin="customFetch" />
    <ErrorToaster v-model="deleteError" @relogin="confirmDeletion" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VeeDate from "../form-inputs/MaguasDate.vue";
import moment from "moment";
import ConfirmDialog from "../layouts/MaguasConfirmDialog.vue";
import ErrorToaster from "../toasters/MaguasErrorToaster.vue";
import {
  formatTime,
  dateFormat,
  dateTimeFormat,
} from "../..//helpers/date-formats";

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
  components: { ErrorToaster, VeeDate, ConfirmDialog },
  data() {
    return {
      appointments: [],
      events: [] as any[],
      fetchError: {},
      deleteError: {},
      rooms: [
        "Bancos",
        "Sala cuadrada",
        "Sala rectangular",
        "Privados jefes",
        "Privados independientes",
        "Firmas externas",
      ],
      colors: [
        "blue",
        "red",
        "deep-purple",
        "green",
        "brown",
        "orange",
        "grey darken-1",
      ],
      selectedEvent: {} as { data: unknown },
      selectedAppointment: null as unknown | null,
      selectedElement: null as unknown | null,
      selectedOpen: false,
      loading: true,
      confirmDialog: false,
      selectedDate: moment().subtract(1, "month").format(dateFormat),
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
        this.appointments = [];
      } catch (e) {
        this.fetchError = e;
      }
      this.loading = false;
    },
    editItem: function (item) {
      const id = String(item.id);
      this.$router.push({
        name: "AppointmentsEdit",
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
      if (this.selectedAppointment) {
        this.deleteItem(this.selectedAppointment);
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
        this.selectedAppointment = event.data;
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
        name: "AppointmentsNew",
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
    appointments: function () {
      this.events = this.appointments.map((appointment) => {
        return {
          name: appointment.name,
          start: moment(appointment.startDate).format(dateTimeFormat),
          end: moment(appointment.endDate).format(dateTimeFormat),
          color: this.colors[appointment.roomId - 1],
          timed: false,
          category: appointment.roomName,
          data: appointment,
        };
      });
    },
  },
});
</script>

<style>
.appointments-calendar .v-calendar-daily__head .v-calendar-category__category {
  padding: 1rem 0;
}
.appointments-calendar .v-calendar-daily__head .v-calendar-daily_head-weekday {
  display: none;
}
.appointments-calendar
  .v-calendar-daily__head
  .v-calendar-daily_head-day-label {
  display: none;
}
</style>
