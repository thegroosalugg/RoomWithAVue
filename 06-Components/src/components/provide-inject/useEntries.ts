// composables/useEntries.ts
import { inject, provide, ref, type Ref } from 'vue'
import type { InjectionKey } from 'vue'
import type Entry from '@/models/Entry'
import { ENTRIES } from '@/api/entries'; // dummy data

interface EntriesContext {
         entries: Ref<Entry[]>
     activeEntry: Ref<Entry | null>
  setActiveEntry: (id: string) => void
}
// InjectionKey provides <type> safety; replaces string 'key' when using provide('key', value) | inject('key', defaultValue)
const entriesKey: InjectionKey<EntriesContext> = Symbol()

// Provider composable
export function provideEntries() {
  const     entries = ref<Entry[]>(ENTRIES)
  const activeEntry = ref<Entry | null>(null)

  function setActiveEntry(entryId: string) {
    activeEntry.value = entries.value.find(({ id }) => id === entryId) || null
  }

  const context: EntriesContext = { entries, activeEntry, setActiveEntry }

  provide(entriesKey, context)

  return context  // optionally return for the provider component
}

// Consumer composable
export function useEntries() {
  const context = inject(entriesKey) // returns <T> | undefined: Vue cannot guarantee value at runtime

  if (!context) {
    throw new Error('useEntries must be used within a component that calls provideEntries')
  }

  return context
}
