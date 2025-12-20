<template>
  <li>
    <h2>{{ entry.title }}</h2>
    <p>{{ entry.desc }}</p>
    <button class="button" @click="$emit('select', entry.id)">Learn More</button>
  </li>
</template>

<script setup lang="ts">
  import type Entry from '@/models/Entry'

  defineProps<{ entry: Entry }>()
  defineEmits<{ (e: 'select', entryId: string): void }>()
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
