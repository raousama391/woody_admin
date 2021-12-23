<template>
  <v-dialog :value="value" @input="$emit('value', false)" persistent>
    <v-card
      style="
        padding: 20px;
        text-align: left;
        display: flex;
        align-items: center;
      "
    >
      <v-card-text class="primary--text">
        {{ message }}
        <v-progress-linear
          indeterminate
          color="primary"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "loadingdialog",
  model: {
    prop: "value",
    event: "value",
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>