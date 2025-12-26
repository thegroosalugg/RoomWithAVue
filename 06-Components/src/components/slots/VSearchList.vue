<template>
  <div class="search-list">
    <input v-model="query" type="search" placeholder="Search..." class="box" />
    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        <!-- Slot props: exposes data to parent (React: Render Props) -->
        <slot :item="item" :query="query" />
      </li>
      <li v-if="!filteredItems.length">
        <!-- 2nd Slot: Optional placeholder; replaced if parent calls <template #empty="{ query }"> -->
        <slot name="empty" :query="query">
          <p>No results for "{{ query }}"</p>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
  import { ref, computed } from 'vue'

   // searchKey: which property to search (e.g., 'title', 'name')
  const props = defineProps<{ items: T[], searchKey: string }>()

  const query = ref('')

  const filteredItems = computed(() => {
    if (!query.value) return props.items

    return props.items.filter((item) =>
      item[props.searchKey].toLowerCase().includes(query.value.toLowerCase()),
    )
  })
</script>

<style scoped>
  .search-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 90%;
    padding: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  p { text-align: center; }
</style>
