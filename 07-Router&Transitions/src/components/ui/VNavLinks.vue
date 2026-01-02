<template>
  <nav :class="['nav-links', { column, responsive }]">
    <RouterLink v-for="{ path, label } in links" :key="path" :to="path">{{ label }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">
  interface NavLink {
     path: string
    label: string
  }
  defineProps<{ links: NavLink[]; column?: boolean; responsive?: boolean }>()
</script>

<style scoped>
  .nav-links {
    display: flex;
    gap: 0.5rem;

    &.column { flex-direction: column; }

    &.responsive {
      display: none;
      @media (min-width: 768px) { display: flex; }
    }

    a {
      transition: var(--transition);
      &:hover { text-decoration-line: underline; }
    }
  }
</style>
