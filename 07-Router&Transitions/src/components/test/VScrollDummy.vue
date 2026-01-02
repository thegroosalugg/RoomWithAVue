<template>
  <ul>
    <li
       v-for="num in elements"
        :key="num"
       class="box"
      :style="{ color: `var(--${color})`, width: getWidth(num) }"
    >
      {{ num }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Color } from '@/lib/types/colors'

  withDefaults(defineProps<{ elements?: number; color?: Color }>(), { elements: 25, color: 'text' })

  function getWidth(num: number) {
    return Math.min(40 + 1 * num, 1920) + 'px'
  }
</script>

<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: var(--padding-md);
    text-align: center;
  }
  li {
    max-width: 100%;
  }
</style>
