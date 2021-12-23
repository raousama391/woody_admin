<template>
  <div id="bg">
    <v-container class="m-a-8 mx-auto">
      <v-card class="rounded-lg">
        <v-tabs v-model="tab">
          <v-tab>Pending</v-tab>
          <v-tab>Approved</v-tab>
          <v-tab>Rejected</v-tab>
          <v-tab>Cancelled</v-tab>
          <v-tab>Completed</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <CustomTable
              class="elevation-0"
              title="Pending Appointments"
              :headers="headers"
              :items="lists"
              :close="true"
              :check="true"
              :clock="true"
              :editap="true"
            >
            </CustomTable>
          </v-tab-item>
          <v-tab-item>
            <CustomTable
              class="elevation-0"
              title="Approved Appointments"
              :headers="headers1"
              :items="lists1"
              :scheck="true"
              :editap="true"
            >
            </CustomTable>
          </v-tab-item>
          <v-tab-item>
            <CustomTable
              class="elevation-0"
              title="Rejected Appointments"
              :headers="headers2"
              :items="lists2"
              :editap="true"
            >
            </CustomTable>
          </v-tab-item>
          <v-tab-item>
            <CustomTable
              class="elevation-0"
              title="Cancelled Appointments"
              :headers="headers3"
              :items="lists3"
              :editap="true"
            >
            </CustomTable>
          </v-tab-item>
          <v-tab-item>
            <CustomTable
              class="elevation-0"
              title="Completed Appointments"
              :headers="headers4"
              :items="lists4"
              :editap="true"
            >
            </CustomTable>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {
  getAppointmentType,
  getServiceType,
  formatDate,
  compareDates,
  getTimeSlotValue,
} from "@/utils/local";
import CustomTable from "../../components/table.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "appointment",
  components: { CustomTable },
  data() {
    return {
      lists: [],
      lists1: [],
      lists2: [],
      lists3: [],
      lists4: [],
      tab: null,
      headers: [
        { text: "Client", value: "person", width: "100px" },
        { text: "Type", value: "type" },
        { text: "Service", value: "service" },
        { text: "Data", value: "date" },
        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
      headers1: [
        { text: "Client", value: "person", width: "100px" },
        { text: "Type", value: "type" },
        { text: "Service", value: "service" },
        { text: "Data", value: "date" },

        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
      headers2: [
        { text: "Client", value: "person", width: "100px" },
        { text: "Type", value: "type" },
        { text: "Service", value: "service" },
        { text: "Data", value: "date" },

        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
      headers3: [
        { text: "Client", value: "person", width: "100px" },
        { text: "Type", value: "type" },
        { text: "Service", value: "service" },
        { text: "Data", value: "date" },

        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
      headers4: [
        { text: "Client", value: "person", width: "100px" },
        { text: "Type", value: "type" },
        { text: "Service", value: "service" },
        { text: "Data", value: "date" },

        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
    };
  },
  mounted() {
    axios.get("/appointment/populated/0").then((resp) => {
      this.lists = resp.data;
      console.log(resp.data);
    });
    axios.get("/appointment/populated/1").then((resp) => {
      this.lists1 = resp.data;
      console.log(resp.data);
    });
    axios.get("/appointment/populated/2").then((resp) => {
      this.lists2 = resp.data;
      console.log(resp.data);
    });
    axios.get("/appointment/populated/3").then((resp) => {
      this.lists3 = resp.data;
      console.log(resp.data);
    });
    axios.get("/appointment/populated/4").then((resp) => {
      this.lists4 = resp.data;
      console.log(resp.data);
    });
  },
  methods: {
    getAppointmentType,
    getServiceType,
    formatDate,
    compareDates,
    getTimeSlotValue,
  },
};
</script>
