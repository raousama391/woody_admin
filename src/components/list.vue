<template>
  <v-list dense >
    <template  v-for="(item, key) in items">
      <v-list-item :to="item.route" :key="key">
        <v-list-item-icon >
          <v-icon v-text="item.icon" ></v-icon>
        </v-list-item-icon>
        <v-list-item-content >
          <v-list-item-title  v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
export default {
  name: "list",
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
      { text: "Appointments", icon: "mdi-calendar", route: "/appointment" },
      { text: "Time Slot", icon: "mdi-alarm", route: "/timeslot" },
      { text: "Setings", icon: "mdi-cog", route: "/settings" }
    ],
  }),
};
</script>