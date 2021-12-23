<template>
  <div class="pt-4">
    <simpleform @done="$router.back()">
      <h5 class="pa-6 display-1">
        {{ isEdit ? "Create Appointment" : "Update Appointment" }}
      </h5>

      <v-text-field
        :value="getAppointmentType(appointment.type)"
        dense
        label="Appointment Type"
        outlined
        readonly
        class="span-2"
      />
      <v-text-field
        :value="getServiceType(appointment.service)"
        dense
        label="Service Type"
        outlined
        readonly
        class="span-2"
      />

      <v-textarea
        v-model="appointment.description"
        label="Description"
        dense
        readonly
        outlined
        persistent-hint
        class="span-2"
      />

      <v-text-field
        :value="formatDate(appointment.date)"
        dense
        label="Preferred Date"
        outlined
        readonly
        class="span-2"
      />
      <v-text-field
        :value="getTimeSlot(appointment.time_slot)"
        dense
        label="Preferred Time Slot"
        outlined
        readonly
        class="span-2"
      />
      <div
        v-if="appointment.type === 0"
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 20px;
        "
        class="span-2"
      >
        <h4 class=" text-left pb-3">Address</h4>

        <br />
        <v-text-field
          :value="appointment.address"
          dense
          label="Address"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.state"
          dense
          label="State"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.city"
          dense
          label="City"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.zip"
          dense
          label="Zip Code"
          outlined
          readonly
        />
      </div>

      <div
        v-if="appointment.vehicle"
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 20px;
        "
        class="span-2"
      >
        <h4 class=" text-left pb-3">Vehicle Detail</h4>

        <br />
        <v-text-field
          :value="appointment.vehicle.year"
          dense
          label="Year"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.vehicle.make"
          dense
          label="Make"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.vehicle.model"
          dense
          label="Model"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.vehicle.vin"
          dense
          label="VIN"
          outlined
          readonly
        />
      </div>
      <div
        v-if="appointment.person"
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 20px;
        "
        class="span-2"
      >
        <h4 class=" text-left pb-3">Client Detail</h4>
        <br />
        <v-text-field
          :value="appointment.person.first_name"
          dense
          label="First Name"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.person.last_name"
          dense
          label="Last Name"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.person.username"
          dense
          label="Email"
          outlined
          readonly
        />
        <v-text-field
          :value="appointment.person.phone"
          dense
          label="Phone #"
          outlined
          readonly
        />
      </div>
      <div class="pa-4">
        <v-btn
          v-if="appointment.status === 0"
          color="error"
          class="mr-3"
          elevation="0"
          @click="changeStatus(4, id)"
          >Reject</v-btn
        >
        <v-btn
          v-if="appointment.status === 0"
          color="success"
          class="mr-3"
          elevation="0"
          @click="changeStatus(1, id)"
          >Approve</v-btn
        >
      </div>
    </simpleform>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import simpleform from "../../components/simpleform.vue";
import {
  getAppointmentType,
  getServiceType,
  formatDate,
  compareDates,
  getTimeSlot,
} from "@/utils/local";
export default {
  components: { simpleform },
  name: "appointmentform",

  Simpleformcomponent: { simpleform },

  data() {
    return {
      id: this.$route.query.id,
      isEdit: false,
      appointment: {},
      errors: [],
      appointmentTypes: [
        {
          label: "AC/Heating Issue",
          value: 1,
        },
        {
          label: "Transmission Concern",
          value: 2,
        },
        {
          label: "Battery Concern",
          value: 3,
        },
        {
          label: "Brake Systems",
          value: 4,
        },
        {
          label: "Engine or Electrical",
          value: 5,
        },
        {
          label: "Radio/Nav Concern",
          value: 6,
        },
        {
          label: "Steering/Suspension Concern",
          value: 7,
        },
        {
          label: "General Maintenance",
          value: 8,
        },
        {
          label: "Other",
          value: 9,
        },
      ],
    };
  },
  methods: {
    getAppointmentType,
    getServiceType,
    formatDate,
    compareDates,
    getTimeSlot,
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
  mounted() {
    this.axios.get("/appointment/" + this.id).then((resp) => {
      this.appointment = resp.data;
      console.log(resp.data);
    });
  },
};
</script>