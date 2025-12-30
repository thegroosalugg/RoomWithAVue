<template>
  <VSidebar position="left">
    <VNavLinks column :links="navLinks" />
  </VSidebar>
</template>

<script setup lang="ts">
  import VNavLinks from '@/components/ui/VNavLinks.vue'
  import VSidebar from '@/components/ui/VSidebar.vue'
  import { navLinks } from '@/lib/meta/meta'
</script>

<style scoped>
  .nav-links {
    padding: var(--padding-lg);
  }
</style>
