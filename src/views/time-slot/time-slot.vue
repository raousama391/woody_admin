<template>
  <div id="bg">
    <v-container class="m-a-8 mx-auto rounded-lg">
      <v-card class="rounded-lg">
        <CustomTable
          title="Time Slots"
          :headers="headers"
          :items="lists"
          :allowAdd="true"
          :deleteHandler="true"
          :editHandler="true"
          @add-new="addNew"
          delete-length-check
        >
        </CustomTable>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { getTimeSlotValue } from "@/utils/local";
import CustomTable from "../../components/table.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "timeslot",
  components: {
    CustomTable
  },
  data() {
    return {
      dialog: false,
      lists: [],
      headers: [
        { text: "From", value: "from" },
        { text: "To", value: "to" },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "right",
          width: "100px",
        },
      ],
    };
  },
  mounted() {
    axios.get("/time-slot").then((resp) => {
      this.lists = resp.data;
      console.log(resp.data);
    });
  },
  methods: {
    getTimeSlotValue,
    addNew() {
      this.$router.push("/timeslotForm");
    },
    edit(item) {
      this.$router.push(`/time-slot?id=${item._id}`);
    },
  },
};
</script>
<style>
#bg {
  background: #23277c;
  height: 35vh;
}
</style>