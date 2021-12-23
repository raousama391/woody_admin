import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
// import Vue from 'vue'   // in Vue 2

import home from "../views/home.vue";
import signinView from "../views/auth/Signin.vue";
import appointment from "../views/appointments/appointment.vue";
import settings from "../views/settings/setings.vue";
import timeslot from "../views/time-slot/time-slot.vue";
import timeslotsform from "../views/time-slot/timeslotForm.vue"
import appointmentform from "../views/appointments/appointmentform.vue" 


import dashboard from "../components/dashboard.vue";

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    Authenticated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.Authenticated = status;
    },
  },
});

const routes = [
  {
    path: "/auth/Signin",
    name: "signin",
    component: signinView,
  },
  {
    path: "/",
    name: "dashboard",
    component: dashboard,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("auth_token")) {
        next("/auth/Signin");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/appointment",
        name: "Appointment",
        component: appointment,
      },
      {
        path: "/settings",
        name: "Setings",
        component: settings,
      },
      {
        path: "/timeslot",
        name: "timeslot",
        component: timeslot,
      },
      {
        path: "/",
        name: "home",
        component: home,
      },
      {
        path: "/timeslotForm",
        name: "timeslotsform",
        component: timeslotsform,
      },
      {
        path: "/appointmentform",
        name: "appointmentform",
        component: appointmentform,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  store: store,
  base: process.env.BASE_URL,
  routes,
});

export default router;
