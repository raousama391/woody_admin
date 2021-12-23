<template>
  <div>
    <v-card
      elevation="2"
      class="mx-auto rounded-lg"
      max-width="50%"
      min-width="50%"
    >
      <div class="ma-10 justify-center text-center">
        <v-form>
          <slot />
          <v-spacer />
        </v-form>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "simpleform",
};
</script>