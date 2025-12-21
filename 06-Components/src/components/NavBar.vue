<template>
  <header>
    <nav>
      <button @click="$emit('selected', 0)">Props & Emits</button>
      <button @click="$emit('selected', 1)">Provide & Inject</button>
      <button @click="$emit('selected', 2)">Slots</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
  defineEmits<{ (e: 'selected', index: number): void }>()
</script>

<style scoped>
  header {
    padding: 1rem;
    background-color: var(--accent);
  }
  nav {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
  }
  button {
    border: none;
    background: none;
    color: var(--page);
    font-weight: 500;
    transition: var(--transition);

    &:hover { font-weight: 700; }
  }
</style>
