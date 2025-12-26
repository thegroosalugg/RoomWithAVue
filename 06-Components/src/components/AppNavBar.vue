<template>
  <header>
    <nav>
      <button
        v-for="(tab, i) in tabs"
        :key="tab"
        :class="{ underline: activeTab === i }"
        @click="$emit('selected', i)"
      >
        {{ tab }}
      </button>
    </nav>
  </header>
</template>


<script setup lang="ts">
  defineProps<{ activeTab: number }>()
  defineEmits<{ (e: 'selected', index: number): void }>()

  const tabs = ['Props & Emits', 'Provide & Inject', 'Slots', 'Forms', 'HTTP']
</script>

<style scoped>
  header {
    padding: 1rem;
    background-color: var(--accent);
  }
  nav {
    display: flex;
    gap: 1rem;
  }
  button {
    border: none;
    background: none;
    color: var(--page);
    font-weight: 500;
    transition: var(--transition);

    &:hover { text-shadow: var(--text-shadow-lg); }
  }
</style>
