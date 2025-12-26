<!-- Custom v-model means internal JS has to be all manual - it is not worth it. Input components are better served as style & label wrappers -->
<template>
  <div :class="['control', { row, invalid: error }]">
    <label v-if="htmlFor" :for="htmlFor">{{ label }}</label>
    <h2 v-else>{{ label }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps<{ label: string; htmlFor?: string; row?: boolean; error?: boolean }>()
</script>

<style scoped>
  .control {
    display: flex;
    flex-direction: column;
    transition: color var(--transition);

    &:not(.row) > label, > h2 {
      font-weight: 700;
      margin-left: 0.25rem;
    }

    &.row {
      flex-direction: row;
      align-items: center;
      gap: 0.25rem;

      > label { order: 1; }
    }

    &.invalid { color: var(--danger); }
  }
</style>
