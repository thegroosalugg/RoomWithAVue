<template>
  <EntriesBase @select="setActiveEntry" />
  <ActiveEntry :entry="activeEntry" />
</template>

<script setup lang="ts">
  import { provide, ref } from 'vue'
  import ActiveEntry from './ActiveEntry.vue'
  import EntriesBase from './EntriesBase.vue'
  import { ENTRIES } from '@/api/entries'
  import type Entry from '@/models/Entry'

  const entries = ref<Entry[]>(ENTRIES)

  const activeEntry = ref<Entry | null>(null)

  function setActiveEntry(entryId: string) {
    activeEntry.value = entries.value.find(({ id }) => id === entryId) || null
  }

  // ** like in Angular/React context - takes 2 args: provide('key', value)
  // provide('entries', entries)

  // ** can also provide multiple values and functions
  provide('entries', { entries, setActiveEntry })
</script>
