<template>
  <!-- use $emit('event-name', payloadData) for small, direct payloads. Reference a function in <script> when working with greater logic -->
  <li class="box" @click="$emit('select', user.id)">
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
  </li>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import User from '@/models/User'

  // how to add props to components in Vue
  // const props = defineProps<{ user: User; caseCheck: string }>()
  // when setting default values, defineProps is wrapped in another function
  const props = withDefaults(defineProps<{ user: User; caseCheck?: string }>(), {
    caseCheck: 'this is a default Value',
  })

  console.log(props.caseCheck) // props only need to be saved as const if used within <script setup>

  // like (output) in Angular - emits data to parent component
  // const emit = defineEmits<{ (e: 'select', userId: string): void }>()

  // function clickHandler() {
  //   emit('select', props.user.id)
  // }

  // no need to define functions if working with small payloads
  defineEmits<{ (e: 'select', userId: string): void }>()

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
</style>
