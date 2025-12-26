<template>
  <section v-if="entry" class="box">
    <h2>{{ entry.title }}</h2>
    <p>{{ entry.text }}</p>
  </section>
</template>

<script setup lang="ts">
  import { useEntries } from './useEntries'

  const { activeEntry: entry } = useEntries()
</script>

<style scoped>
  section {
    width: 90%;
    max-width: var(--screen-2xl);
    margin: var(--margin);
  }
  h2 {
    color: var(--soft);
    font-size: var(--text-xl);
  }
</style>
