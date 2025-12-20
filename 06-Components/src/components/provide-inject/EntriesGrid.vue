<template>
  <ul>
    <EntryItem
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    />
  </ul>
</template>

<script setup lang="ts">
  // import { inject } from 'vue'
  import EntryItem from './EntryItem.vue'
  import { useEntries } from './useEntries';
  // import type Entry from '@/models/Entry'
  // import { entriesContext, entriesKey } from './useEntries';

  // ** consume provided value; NOTE: when value provided directly (without object nesting), Vue automatically unwraps refs
  // const entries = inject<Entry[]>('entries')

  // ** When provider is an object with multiple values, destructure required value - but a default must be set by inject('key', defaultValue)
  // const { entries } = inject(entriesKey, entriesContext)

  // **  React pattern; inject context values with custom hook
  const { entries } = useEntries()

  defineEmits<{ (e: 'select', entryId: string): void }>()
</script>

<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
