<template>
  <v-dialog :value="flag" @input="$emit('value', true)" persistent>
    <v-card
      style="
        padding: 20px;
        text-align: center;
        display: block;
        align-items: center;
      "
    >
      <v-card-title> Your Login Is Not valid </v-card-title>
      <v-card-text color="primary" class="primary--text">
        E-mail or password is incorrect
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" elevation="0" @click="$emit('value', false)"
          >Ok</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "error",
  model: {
    prop: "flag",
    event: "value",
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    flag: {
      type: Boolean,
      default: false,
    },
  },
};
</script>