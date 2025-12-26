<template>
  <li>
    <h2>{{ entry.title }}</h2>
    <p>{{ entry.desc }}</p>
    <button class="button" @click="setActiveEntry(entry.id)">Learn More</button>
  </li>
</template>

<script setup lang="ts">
  import type Entry from '@/models/Entry'
  import { useEntries } from './useEntries';
  // import { inject } from 'vue'
  // import { entriesContext, entriesKey } from './useEntries'

  defineProps<{ entry: Entry }>()

  // **consume injected function
  // const { setActiveEntry } = inject(entriesKey, entriesContext)

  // **  React pattern; inject context values with custom hook
  const { setActiveEntry } = useEntries()
</script>

<style scoped>
  h2 {
    font-size: var(--text-2xl);
  }
  p {
    margin: 0.25rem 0;
    color: var(--soft);
    font-weight: 500;
  }
</style>
