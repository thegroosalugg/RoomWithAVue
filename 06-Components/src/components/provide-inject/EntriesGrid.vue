<template>
  <ul>
    <EntryItem
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
      @select="$emit('select', $event)"
    />
  </ul>
</template>

<script setup lang="ts">
  import EntryItem from './EntryItem.vue'
  import type Entry from '@/models/Entry'

  defineProps<{ entries: Entry[] }>()
  defineEmits<{ (e: 'select', entryId: string): void }>()
</script>

<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
