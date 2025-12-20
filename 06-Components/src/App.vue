<template>
  <NavBar @selected="setIsActive" />
  <PropsEmitsDemo v-if="isActive === 0" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // local component scoping
  import NavBar from './components/NavBar.vue'
  import PropsEmitsDemo from './components/props-emits/PropsEmitsDemo.vue'

  const isActive = ref(0)

  function setIsActive(index: number) {
    isActive.value = index
  }
</script>
