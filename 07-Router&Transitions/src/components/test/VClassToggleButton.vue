<template>
  <button @click="toggleClass('fixed-layout')">
    {{ hasClassList ? '📱' : '🖥️' }}
  </button>
</template>

<script setup lang="ts">
  import { useToggleClass } from '@/lib/composables/useToggleClass'

  const { hasClassList, toggleClass } = useToggleClass()
</script>
