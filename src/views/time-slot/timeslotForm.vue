<template>
    <simpleform class="center-screen">
      <div>
        <h2 class="pa-3 display-1">
          {{ isEdit ? "Update Time Slot" : "Create Time Slot" }}
        </h2>
        <p class="span-2" style="gap 10px">Timeslot From</p>
        <div class="d-flex" style="gap: 10px">
          <v-select
            v-model="timeslot.from"
            dense
            :items="hours"
            label="Hour"
            outlined
          />
          <v-select
            v-model="timeslot.fromType"
            dense
            :items="type"
            label="AM / PM"
            outlined
          />
        </div>

        <p class="span-2">Timeslot To</p>
        <div class="d-flex" style="gap: 10px">
          <v-select
            v-model="timeslot.to"
            dense
            :items="hours"
            label="Hour"
            outlined
          />
          <v-select
            v-model="timeslot.toType"
            dense
            :items="type"
            label="AM / PM"
            outlined
          />
        </div>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn @click="submit" type="submit" color="primary" class="ma-4"
            >Submit</v-btn
          >
        </div>
      </div>
    </simpleform>
    <!-- <loadingdialog v-model="dialog" message="loading......" /> -->
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import simpleform from "../../components/simpleform.vue";
import loadingdialog from "../../components/loadingdialog.vue";
import { getTimeSlotValue } from "@/utils/local";
import { TimeSlotService } from "@/services/time_slots-service";
export default {
  name: "timeslotsform",
  components: { simpleform, loadingdialog },
  data() {
    return {
      service: new TimeSlotService(),
      dialog: false,
      // id: this.$route.query.id,
      timeslot: {},
      data: {},
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      type: ["PM", "AM"],
      isEdit: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.loadTimeslot();
  },
  created() {},
  methods: {
    getTimeSlotValue,
    async loadTimeslot() {
      if (!this.$route.query.id) return;
      this.isEdit = true;
      this.dialog = true;
      this.timeslot = await this.service.fetchOne(this.$route.query.id);
      let data = this.getTimeSlotValue(this.timeslot.from).split(" ");
      this.timeslot.from = parseInt(data[0]);
      this.timeslot.fromType = data[1];
      data = this.getTimeSlotValue(this.timeslot.to).split(" ");
      this.timeslot.to = parseInt(data[0]);
      this.timeslot.toType = data[1];
      this.dialog = false;
    },
    preCheck(context) {
      if (!context) return false;

      this.data = {
        from: this.timeslot.from,
        to: this.timeslot.to,
      };
      if (this.timeslot.fromType === "AM" && this.timeslot.from === 12) {
        this.data.from = 0;
      }
      if (this.timeslot.toType === "AM" && this.timeslot.to === 12) {
        this.data.to = 0;
      }
      if (this.timeslot.fromType === "PM" && this.timeslot.from !== 12) {
        this.data.from = this.timeslot.from + 12;
      }
      if (this.timeslot.toType === "PM" && this.timeslot.to !== 12) {
        this.data.to = this.timeslot.to + 12;
      }
      return true;
    },
    async submit(context) {
      if (this.preCheck(context)) {
        if (this.isEdit) {
          try {
            this.data._id = this.timeslot._id;
            this.axios.patch("/time-slot", this.timeslot).data;
            await this.$router.push("/timeslot");
            return true;
          } catch (e) {
            return false;
          }
        } else {
          try {
            this.axios.post("/time-slot", this.timeslot).data;
            await this.$router.push("/timeslot");
            return true;
          } catch (e) {
            return false;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
p {
  font-weight: bold;
  text-align: left;
}
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
  background: none;
}
</style>