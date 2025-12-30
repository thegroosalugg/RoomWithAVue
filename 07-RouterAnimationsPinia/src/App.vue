<template>
  <AppHeader @resize="offsetHeight = $event" />
  <NavigationSidebar />
  <SettingsSidebar />
  <main :style="{ marginTop: offsetHeight + 'px' }">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AppHeader from './layouts/AppHeader.vue'
  import AppFooter from './layouts/AppFooter.vue'
  import NavigationSidebar from './layouts/NavigationSidebar.vue';
  import SettingsSidebar from './layouts/SettingsSidebar.vue';
  import { provideSidebar } from './lib/composables/useSidebar';

  const offsetHeight = ref(0)
  provideSidebar()
</script>

<style scoped>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
