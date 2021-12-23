<template>
  <v-container class="m-a-8">
    <div class="d-flex align-center">
      <v-card-title>{{ title }}</v-card-title>
      <v-spacer />
      <div class="d-flex justify-end mt-4">
        <v-text-field
          filled
          placeholder="Search Anything...."
          v-model="search"
          dense
          outlined
          class="mr-6"
        ></v-text-field>
        <v-btn
          @click="$emit('add-new')"
          class="mr-3"
          color="primary"
          dark
          v-if="allowAdd"
        >
          Add New
        </v-btn>
        <v-btn icon class="mr-3" @click="loadData">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :search="search"
      :items="items"
      class="elevation-0"
    >
      <template v-slot:item.person="{ item }">
        <span>{{ item.person.first_name + " " + item.person.last_name }}</span>
      </template>
      <template v-slot:item.type="{ item }">
        <span>{{ getAppointmentType(item.type) }}</span>
      </template>
      <template v-slot:item.service="{ item }">
        <span>{{ getServiceType(item.service) }}</span>
      </template>
      <template v-slot:item.date="{ item }">
        <span
          :class="
            compareDates(item.date, new Date())
              ? 'chip light-green'
              : 'chip red'
          "
          >{{ formatDate(item.date) }}</span
        >
      </template>
      <template v-slot:item.from="{ item }">
        <span>{{ getTimeSlotValue(item.from) }}</span>
      </template>
      <template v-slot:item.to="{ item }">
        <span>{{ getTimeSlotValue(item.to) }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          v-if="scheck"
          small
          color="green"
          @click="changeStatus(3, item._id)"
        >
          mdi-check
        </v-icon>
        <v-icon
          v-if="check"
          small
          color="green"
          @click="changeStatus(1, item._id)"
        >
          mdi-check-circle
        </v-icon>
        <v-icon
          v-if="close"
          small
          color="red"
          @click="changeStatus(4, item._id)"
        >
          mdi-close-circle
        </v-icon>

        <v-icon
          v-if="clock"
          small
          color="orange"
          @click="editappointmenttimeslot(item)"
        >
          mdi-clock</v-icon
        >
        <v-icon
          v-if="editap"
          small
          color="green"
          @click="editappointment(item._id)"
        >
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="viewHandler" small> mdi-eye </v-icon>
        <v-icon
          v-if="editHandler"
          small
          color="green"
          @click="edittimeslot(item._id)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="deleteHandler"
          small
          color="red"
          @click="deletetimeslot(item._id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <loadingdialog  v-model="dialog" message="loading......">
      <v-dialog v-model="editDialog" width="30%" persistent >
        <v-card>
          <v-card-title> Update Appointment Time </v-card-title>
          <v-select> </v-select>

          <v-text-field outlined dense type="date"></v-text-field>
          <!-- <div class="d-flex justify-end">
              <v-btn @click="cancelEditAppointment" class="mr-2">Cancel</v-btn>
              <v-btn
                @click="submitEditAppointment"
                color="primary"
                elevation="0"
                >Submit</v-btn
              >
            </div> -->
        </v-card>
      </v-dialog>
    </loadingdialog>
  </v-container>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import loadingdialog from "../components/loadingdialog.vue";
import {
  getAppointmentType,
  getServiceType,
  formatDate,
  compareDates,
  getTimeSlotValue,
} from "@/utils/local";
export default {
  name: "CustomDataTable",
  components: { loadingdialog },
  data() {
    return {
      search: "",
      dialog: false,
      loading: false,
      id: this.$route.query.id,
      editTimeSlots: [],
      editItem: null,
      editDialog: false,
    };
  },
  props: {
    status: {
      type: Number,
      default: 0,
    },
    allowAdd: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: "CustomTable",
      required: true,
    },
    editHandler: {
      type: Boolean,
      default: false,
    },

    viewHandler: {
      type: Boolean,
      default: false,
    },
    check: {
      type: Boolean,
      default: false,
    },
    scheck: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
    clock: {
      type: Boolean,
      default: false,
    },
    editap: {
      type: Boolean,
      default: false,
    },

    deleteHandler: {
      type: Boolean,
      default: false,
    },
    deleteLengthCheck: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["add-new"],
  methods: {
    getAppointmentType,
    getServiceType,
    formatDate,
    compareDates,
    getTimeSlotValue,
    async getTimeSlots() {
      await this.axios.get("/time-slot", this.editTimeSlots);
    },
    getTitle(status) {
      switch (status) {
        case 0:
          return "Pending";
        case 1:
          return "Approved";
        case 2:
          return "Cancelled";
        case 3:
          return "Completed";
        case 4:
          return "Rejected";
        default:
          return "Invalid";
      }
    },

    deletetimeslot(_id) {
      if (confirm("Are You Sure Want to delete this Time Slot")) {
        try {
          this.axios.delete("/time-slot/" + _id).data;
        } catch (e) {
          window.console.log(e.message);
        }
      }
    },
    edittimeslot(_id) {
      this.$router.push(`/timeslotForm?id=${_id}`);
    },
    editappointmenttimeslot(item) {
      this.getTimeSlots();
      console.log(this.editTimeSlots);
      this.editDialog = true;
    },
    editappointment(_id) {
      this.$router.push(`/appointmentform?id=${_id}`);
    },
    loadData() {
      this.dialog = true;
      this.axios.get("/appointment/", this.appointment).data;
      this.dialog = false;
    },
    async changeStatus(status, id) {
      let send = false;
      if (status === 4) {
        const reason = prompt(
          "Reason for rejection?",
          "Time slot not available"
        );
        console.log(reason);
        if (reason) {
          send = true;
        }
      } else {
        if (
          confirm(
            "Are you sure? This appointment will be " +
              this.getTitle(status).toLowerCase()
          )
        ) {
          send = true;
        }
      }
      if (send) {
        try {
          console.log(status);
          console.log(id);
          console.log(`/appointment/${status}/${id}`);
          await this.axios.patch(`/appointment/${status}/${id}`);
          document.querySelectorAll(".refresh").forEach(function (item) {
            item.click();
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>