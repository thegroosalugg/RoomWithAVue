<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
  defineProps<{ title: string }>()
</script>

<style scoped>
  h1 {
    text-align: center;
    font-size: var(--text-3xl);
    margin: 0.5rem auto;
    max-width: 95%;
  }
</style>
