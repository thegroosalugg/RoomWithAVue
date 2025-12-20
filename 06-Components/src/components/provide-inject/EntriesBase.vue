<template>
  <section class="box">
    <h2>Select a Topic</h2>
    <EntriesGrid :entries="entries" @select="$emit('select', $event)" />
  </section>
</template>

<script setup lang="ts">
  import EntriesGrid from './EntriesGrid.vue'
  import type Entry from '@/models/Entry'

  defineProps<{ entries: Entry[] }>()
  defineEmits<{ (e: 'select', entryId: string): void }>()
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
