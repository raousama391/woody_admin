<template>
  <div>
    <div id="bg" class="pa-4">
      <simpleform>
        <div>
          <v-card-title  class="justify-center text-center">Update Profile</v-card-title>
          <div class="d-flex mt-2" style="gap: 10px">
            <v-text-field
              v-model="user.first_name"
              label="Name"
              placeholder="Name"
              outlined
              dense
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="user.last_name"
              label="Last Name"
              placeholder="Last Name"
              outlined
              dense
              type="text"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="user.username"
            label="Email"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            label="Phone"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
          <div class="d-flex mt-2" style="gap: 10px">
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              outlined
              dense
              type="password"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="oldpassword"
            label="Old Password"
            outlined
            dense
            type="password"
          ></v-text-field>
        </div>
        <v-btn @click="sendData" type="submit" color="primary" class="ma-4"
          >Submit</v-btn
        >
      </simpleform>
      <loadingdialog v-model="dialog" :loading="dialog" />
    </div>
  </div>
</template>
<script>
import simpleform from "../../components/simpleform.vue";
import loadingdialog from "../../components/loadingdialog.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  components: {
    simpleform,
    loadingdialog,
  },
  name: "settings",
  data() {
    return {
      dialog: false,
      user: {},
      type: "password",
      password: null,
      confirmPassword: null,
      oldpassword: null,
    };
  },

  methods: {
    sendData(e) {
      this.axios.patch("/person", this.user).then((resp) => {
        console.log("resp", resp);
        localStorage.setItem("user", JSON.stringify(resp.data)),
        localStorage.getItem(user);
      });
      e.preventDefault();
    },
    async loadUserData() {
      this.dialog = true;
      this.user = JSON.parse(localStorage.getItem("auth_user"));
      this.dialog = false;
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
<style>
#bg {
  height: "30vh";
  background: blue;
}
</style>