<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-card class="profile-view" elevation="1" v-bind="attrs" v-on="on">
          <v-btn elevation="1">{{ getInitial(user.first_name) }}</v-btn>
        </v-card>
      </template>
      <v-card elevation="1" outlined height="200" width="200">
        <div class="text-center mt-3">
          <v-avatar color="primary" size="48">
            <span class="white--text text-h5">{{
              getInitial(user.first_name)
            }}</span>
          </v-avatar>
        </div>
        <div>
          <v-card-subtitle class="text-center mt-2 pa-0">
            {{ this.user.first_name }}
          </v-card-subtitle>
          <v-card-subtitle class="text-center mt-1 pa-0">
            {{ this.user.username }}
          </v-card-subtitle>
          <v-divider></v-divider>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="logout"> Logout </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "popup",
  data: () => ({
    user: {first_name: ''},
  }),
  mounted() {
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.user = JSON.parse(localStorage.getItem("auth_user"));
    }
  },
  methods: {
    getInitial(first_name) {
      console.log(first_name);
      return first_name[0];
    },
    logout() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      localStorage.clear();
      this.$router.push("/auth/Signin");
    },
  },
};
</script>
