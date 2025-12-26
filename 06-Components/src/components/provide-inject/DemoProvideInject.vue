<template>
  <EntriesBase />
  <EntryDetail />
</template>

<script setup lang="ts">
  // import { ref } from 'vue'
  import EntryDetail from './EntryDetail.vue'
  import EntriesBase from './EntriesBase.vue'
  // import { ENTRIES } from '@/api/entries'
  // import type Entry from '@/models/Entry'
  import { provideEntries } from './useEntries';

  // ** Original Code: before moving provide/inject to custom hook
  // const entries = ref<Entry[]>(ENTRIES)
  // const activeEntry = ref<Entry | null>(null)

  // function setActiveEntry(entryId: string) {
  //   activeEntry.value = entries.value.find(({ id }) => id === entryId) || null
  // }

  // ** like in Angular/React context - takes 2 args: provide('key', value)
  // provide('entries', entries)

  // ** can also provide multiple values and functions; uses defined & imported entriesKey for <type> definition
  // provide(entriesKey, { entries, setActiveEntry })

  // ** React pattern: create a context with default value, provide from parent, children inject with custom hook
  provideEntries()
</script>
