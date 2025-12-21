<template>
  <NavBar @selected="setIsActive" />
  <PropsEmitsDemo v-if="isActive === 0" />
  <ProvideInjectDemo v-if="isActive === 1" />
  <SlotsDemo v-if="isActive === 2" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // local component scoping
  import NavBar from './components/NavBar.vue'
  import PropsEmitsDemo from './components/props-emits/PropsEmitsDemo.vue'
  import ProvideInjectDemo from './components/provide-inject/ProvideInjectDemo.vue'
  import SlotsDemo from './components/slots/SlotsDemo.vue'

  const isActive = ref(0)

  function setIsActive(index: number) {
    isActive.value = index
  }
</script>
