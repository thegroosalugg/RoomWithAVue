<template>
  <li class="box">
    <h2>{{ user.name }}</h2>
    <button class="button" @click="toggleDetails">{{ isVisible ? "Hide" : "Show" }} Details</button>
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

<!-- Options API: taught in course; uses data/methods/computed/watch() { is a configuration object }: Vue consumes it. -->
<!-- Composition API: Replaces Options API; original syntax:
<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const count = ref(0)

      function increment() {
        count.value++
      }

      return { count, increment }
    }
  }
</script>
** ^^^ Must return everything the template needs -->
<!-- Modern Composition API (new default)
<script setup>
  Modern Default: removes export default { setup() { return ... } } boilerplate
</script> -->

<script setup lang="ts">
  import type { User } from "@/models/User";
  import { ref } from "vue";

  // how to add props to components in Vue
  const props = defineProps<{ user: User; caseCheck: string }>();

  console.log(props.caseCheck); // props only need to be saved as const if used within <script setup>

  // ref creates reactive state tracked by Vue; updates to .value trigger template re-renders
  const isVisible = ref(false);

  function toggleDetails() {
    isVisible.value = !isVisible.value;
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
