<template>
  <div id="bg">
    <div
      class="d-flex flex-wrap mx-auto justify-center pa-4"
      style="gap: 10px !important"
    >
      <v-card
        color="#2096f2"
        elevation="1"
        class="pa-4 white--text text-center rounded-lg"
        style="min-width: calc(25% - 10px)"
      >
        <v-card-title>Pending Appointments</v-card-title>
        <h1>{{ dashboard.pending || 0 }}</h1>
      </v-card>
      <v-card
        color="#9e28b2"
        elevation="1"
        class="pa-4 white--text text-center rounded-lg"
        style="min-width: calc(25% - 10px)"
      >
        <v-card-title>Approved Appointments</v-card-title>
        <h1>{{ dashboard.accepted || 0 }}</h1>
      </v-card>
      <v-card
        color="#e91d62"
        elevation="1"
        class="pa-4 white--text text-center rounded-lg"
        style="min-width: calc(25% - 10px)"
      >
        <v-card-title>Cancelled Appointments</v-card-title>
        <h1>{{ dashboard.cancelled || 0 }}</h1>
      </v-card>
      <v-card
        color="#4db151"
        elevation="1"
        class="pa-4 white--text text-center rounded-lg"
        style="min-width: calc(25% - 10px)"
      >
        <v-card-title>Completed Appointments</v-card-title>
        <h1>{{ dashboard.completed || 0 }}</h1>
      </v-card>
    </div>
    <v-container class="m-a-8 mx-auto rounded-lg">
      <v-card>
        <CustomTable
          title="Today's Appointments"
          :headers="headers"
          :items="lists"
          :close="true"
          :check="true"
          :clock="true"
          :editap="true"
        />
      </v-card>
    </v-container>
  </div>
</template>
<script>
import CustomTable from "../components/table.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "home",
  components: {
    CustomTable,
  },
  data() {
    return {
      dashboard: {},
      lists: [],
      headers: [
        {
          text: "Client",
          value: "person",
          sortable: false,
        },
        {
          text: "Type",
          value: "type",
          sortable: false,
        },
        {
          text: "Service",
          value: "service",
        },
        {
          text: "Date",
          value: "date",
        },
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
    axios.get("/appointment/dashboard").then((resp) => {
      this.dashboard = resp.data;
      // this.lists = resp.data.data;
      console.log(resp.data);
    });
    axios.get("/appointment/populated").then((resp) => {
      this.lists = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
<style>
#bg {
  height: "30vh";
  background: blue;
}
</style>