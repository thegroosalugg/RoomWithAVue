<template>
  <section class="box">
    <h2>Select a Topic</h2>
    <EntriesGrid />
  </section>
</template>

<!-- Dummy Component to create Grandparent > Parent > Child relationship -->
<script setup lang="ts">
  import EntriesGrid from './EntriesGrid.vue'
</script>

<style scoped>
  section {
    width: 90%;
    max-width: var(--screen-2xl);
    margin: var(--margin);
  }
  h2 {
    font-size: var(--text-3xl);
    text-align: center;
  }
</style>
