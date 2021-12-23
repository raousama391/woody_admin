<template>
  <div id="background">
    <v-card elevation="4" class="mx-auto rounded-lg" max-width="45%">
      <div class="ma-10 justify-center text-center">
        <img src="/logo.webp" alt="logo" class="logo" />

        <h2 class="justify-center text-center ma-3">V-Model Testing</h2>

        <v-form>
          <p>{{ message }}</p>
          <v-text-field
            class="input"
            v-model="message"
            append-icon="mdi-send"
            type="text"
            @click:append="sendMessage"
          ></v-text-field>

          <v-card-actions class="justify-center">
            <v-btn
              large
              class="ma-4"
              width="100%"
              height="45px"
              color="primary"
              v-on:click="sayHi"
            >
              Say Hello
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "vmodel",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sayHi: function () {
      this.message = "Hello " + this.message;
    },
    sendMessage() {
      console.log(this.message);
      this.message = "";
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
</style>