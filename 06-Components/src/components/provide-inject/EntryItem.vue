<template>
  <li>
    <h2>{{ entry.title }}</h2>
    <p>{{ entry.desc }}</p>
    <button class="button" @click="setActiveEntry(entry.id)">Learn More</button>
  </li>
</template>

<script setup lang="ts">
  import type Entry from '@/models/Entry'
  import { inject } from 'vue'

  defineProps<{ entry: Entry }>()

  // consume injected function
  const { setActiveEntry } = inject<{ setActiveEntry: (id: string) => void }>('entries', {
    setActiveEntry: () => {},
  })
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
