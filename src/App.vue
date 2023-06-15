<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    RouterView,
  },
};
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
:root {
  --brand-color: #7580e5;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  min-height: 100vh;
}
</style>
