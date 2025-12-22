<template>
  <li class="box">
    <h2>{{ user.name }}</h2>
    <button class="button" @click.stop="toggleDetails">
      {{ isVisible ? 'Hide' : 'Show' }} Details
    </button>
    <ul v-if="isVisible">
      <li>
        <strong>Phone:</strong>
        {{ user.phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ user.email }}
      </li>
    </ul>
    <!-- use $emit('event-name', payloadData) for small, direct payloads. Reference a function in <script> when working with greater logic -->
    <button v-if="isVisible" class="button delete" @click="$emit('selected')">
      Delete
    </button>
  </li>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type User from '@/models/User'

  // how to add props to components in Vue
  // const props = defineProps<{ user: User; caseCheck: string }>()
  // when setting default values, defineProps is wrapped in another function
  const props = withDefaults(defineProps<{ user: User; caseCheck?: string }>(), {
    caseCheck: 'UserItem.vue: this is a default Value',
  })

  onMounted(() => {
    console.log(props.caseCheck) // props only need to be saved as const if used within <script setup>
  })

  defineEmits<{ (e: 'selected'): void }>()

  // ref creates reactive state tracked by Vue; updates to .value trigger template re-renders
  const isVisible = ref(false)

  function toggleDetails() {
    isVisible.value = !isVisible.value
  }
</script>

<style scoped>
  li {
    margin: var(--margin);
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }
  h2 {
    font-size: var(--text-3xl);
    border-bottom: 4px solid var(--support);
    color: var(--accent);
    margin: 0 0 1rem 0;
  }
  .delete {
    background-color: var(--danger);

    &:hover {
      background-color: var(--page);
      border-color: var(--danger);
      color: var(--danger);
    }
  }
</style>
