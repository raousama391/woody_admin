<template>
  <div id="background">
    <v-card id="card" elevation="4" class="mx-auto rounded-lg" width="400px" >
      <div class="ma-10 justify-center text-center">
        <img src="/logo.webp" alt="logo" class="logo" />

        <h2 class="justify-center text-center">Authenticate yourself</h2>
        <p class="text-center">
          You need a Woody Mobile Service admin account to access the content
          ahead, if you do not have an account or have forgotten your password
          then you can contact the support regarding your issue
        </p>
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="Your Email"
            v-model="email"
            required
            outlined
            dense
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            dense
            type="password"
            :rules="passwordrules"
          ></v-text-field>
          <v-card-actions class="justify-center">
            <v-btn
              @click="submit"
              large
              class="ma-4"
              width="100%"
              height="45px"
              color="primary"
            >
              Authenticate
              <v-icon small style="margin-left: 5px">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
        <loadingdialog v-model="dialog" message="You are being Authenticated....." />
        <error v-model="error" />
      </div>
    </v-card>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import loadingdialog from "../../components/loadingdialog.vue";
import error from "../../components/error.vue";
export default {
  components: { loadingdialog, error },
  data() {
    return {
      dialog: false,
      error: false,
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordrules: [(v) => !!v || "Password is required"],
    };
  },
  name: "signinView",
  methods: {
    async submit() {
      if (this.$refs.form) {
        this.dialog = true;
        try {
          const token = (
            await this.$axios.post("/auth/sign-in", {
              username: this.email,
              password: this.password,
            })
          ).data;

          const user = (
            await this.$axios.get("/auth/profile", {
              headers: { authorization: "bearer " + token.access_token },
            })
          ).data;
          localStorage.setItem("auth_token", "bearer " + token.access_token);
          localStorage.setItem("auth_user", JSON.stringify(user));
          this.$router.push("/");
        } catch (e) {
          (this.error = true), console.log(e.message);
          this.dialog = false;
        }
      }
      // else{
      //   this.error=true
      // }
    },
  },
};
</script>
<style>
#background {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #23277c;
}
.logo {
  justify-content: center;
  margin: 30px;
  height: 60px;
  width: 115px;
}

/* @media only screen and (min-width: 600px) {
  #card {
   max-width: "50%"
  }
}
@media only screen and (min-width: 768px) {
#card {
   max-width: "50%"
  }
} 

/* Large devices (laptops/desktops, 992px and up) */
/* @media only screen and (min-width: 992px) {

  #card {
   max-width: "50%"
  }
} 

/* Extra large devices (large laptops and desktops, 1200px and up) */
/* @media only screen and (min-width: 1200px) {
  #card {
   max-width: "50%"
  } */ 
</style>