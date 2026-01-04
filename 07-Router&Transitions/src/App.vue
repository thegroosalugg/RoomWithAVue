<template>
  <AppHeader @resize="offsetHeight = $event" />
  <NavigationSidebar />
  <SettingsSidebar />
  <main :style="{ marginTop: offsetHeight + 'px' }">
    <!-- v-slot="slotProps" | #default="slotProps" accesses component to be rendered -->
    <RouterView #default="{ Component }">
      <!-- <Transition> must be inside <RouterView>; <component> must have 1 child wrapper or <Transition> fails -->
      <Transition name="page" mode="out-in">
        <!-- any rendered Pages must have a single wrapper -->
        <component :is="Component" />
      </Transition>
    </RouterView>
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
  main { flex: 1; display: flex; flex-direction: column; }
  .page-enter-from, .page-leave-to { opacity: 0; transform: scale(0.9); }
  .page-enter-to, .page-leave-from { opacity: 1; transform: scale(1);   }
  .page-enter-active { transition: 0.4s ease-out; }
  .page-leave-active { transition: 0.4s ease-in;  }
</style>
