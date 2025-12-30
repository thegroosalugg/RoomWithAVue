<template>
  <VSidebar position="right">
    <template #header>
      <h1>Header</h1>
    </template>
    <VScrollDummy />
  </VSidebar>
</template>

<script setup lang="ts">
  import VScrollDummy from '@/components/test/VScrollDummy.vue'
  import VSidebar from '@/components/ui/VSidebar.vue'
</script>
