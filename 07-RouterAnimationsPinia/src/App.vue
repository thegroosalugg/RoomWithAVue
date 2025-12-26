<template>
  <AppNavbar @resize="offsetHeight = $event" />
  <main :style="{ marginTop: offsetHeight + 'px' }">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AppNavbar from './layouts/AppNavbar.vue'
  import AppFooter from './layouts/AppFooter.vue';

  const offsetHeight = ref(0)
</script>

<style scoped>
  main {
    flex: 1;
  }
</style>
