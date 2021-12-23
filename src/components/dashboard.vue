<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app elevation="1">
      <img src="logo.webp" alt="logo" class="logo d-flex mx-auto" height="70" />
      <v-divider />
      <list />
    </v-navigation-drawer>

    <v-app-bar app elevate-on-scroll color="primary">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text"
        >Woody Mobile Service</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <popup />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import popup from "./popup.vue";
import list from "./list.vue";
export default {
  components: {
    list,
    popup,
  },
  name: "dashboard",
  data: () => ({ drawer: null }),
};
</script>